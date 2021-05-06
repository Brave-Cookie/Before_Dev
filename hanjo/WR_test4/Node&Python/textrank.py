# -*- coding: utf-8 -*-

import networkx
import re
import sys

class RawSentence:
    def __init__(self, textIter):
        if type(textIter) == str:
            self.textIter = textIter.split('\n')
        else:
            self.textIter = textIter
        self.rgxSplitter = re.compile('([.!?:](?:["\']|(?![0-9])))')

    def __iter__(self):
        for line in self.textIter:
            ch = self.rgxSplitter.split(line)
            for s in map(lambda a, b: a + b, ch[::2], ch[1::2]):
                if not s: continue
                yield s


class RawSentenceReader:
    def __init__(self, filepath):
        self.filepath = filepath
        self.rgxSplitter = re.compile('([.!?:](?:["\']|(?![0-9])))')

    def __iter__(self):
        for line in open(self.filepath, encoding='utf-8'):
            ch = self.rgxSplitter.split(line)
            for s in map(lambda a, b: a + b, ch[::2], ch[1::2]):
                if not s: continue
                yield s


class RawTagger:
    def __init__(self, textIter, tagger=None):
        if tagger:
            self.tagger = tagger
        else:
            from konlpy.tag import Komoran
            self.tagger = Komoran()
        if type(textIter) == str:
            self.textIter = textIter.split('\n')
        else:
            self.textIter = textIter
        self.rgxSplitter = re.compile('([.!?:](?:["\']|(?![0-9])))')

    def __iter__(self):
        for line in self.textIter:
            ch = self.rgxSplitter.split(line)
            for s in map(lambda a, b: a + b, ch[::2], ch[1::2]):
                if not s: continue
                yield self.tagger.pos(s)


class RawTaggerReader:
    def __init__(self, filepath, tagger=None):
        if tagger:
            self.tagger = tagger
        else:
            from konlpy.tag import Komoran
            self.tagger = Komoran()
        self.filepath = filepath
        self.rgxSplitter = re.compile('([.!?:](?:["\']|(?![0-9])))')

    def __iter__(self):
        for line in open(self.filepath, encoding='utf-8'):
            # print(line)
            ch = self.rgxSplitter.split(line)
            for s in map(lambda a, b: a + b, ch[::2], ch[1::2]):
                # print(s)
                if not s: continue
                yield self.tagger.pos(s)


class TextRank:
    def __init__(self, **kargs):
        self.graph = None
        self.window = kargs.get('window', 5)
        self.coef = kargs.get('coef', 1.0)
        self.threshold = kargs.get('threshold', 0.005)
        self.dictCount = {}
        self.dictBiCount = {}
        self.dictNear = {}
        self.nTotal = 0

    def load(self, sentenceIter, wordFilter=None):
        def insertPair(a, b):
            if a > b:
                a, b = b, a
            elif a == b:
                return
            self.dictBiCount[a, b] = self.dictBiCount.get((a, b), 0) + 1

        def insertNearPair(a, b):
            self.dictNear[a, b] = self.dictNear.get((a, b), 0) + 1

        for sent in sentenceIter:
            for i, word in enumerate(sent):
                if wordFilter and not wordFilter(word): continue
                self.dictCount[word] = self.dictCount.get(word, 0) + 1
                self.nTotal += 1
                if i - 1 >= 0 and (not wordFilter or wordFilter(sent[i - 1])): insertNearPair(sent[i - 1], word)
                if i + 1 < len(sent) and (not wordFilter or wordFilter(sent[i + 1])): insertNearPair(word, sent[i + 1])
                for j in range(i + 1, min(i + self.window + 1, len(sent))):
                    if wordFilter and not wordFilter(sent[j]): continue
                    if sent[j] != word: insertPair(word, sent[j])

    def loadSents(self, sentenceIter, tokenizer=None):
        import math
        def similarity(a, b):
            n = len(a.intersection(b))
            return n / float(len(a) + len(b) - n) / (math.log(len(a) + 1) * math.log(len(b) + 1))

        if not tokenizer: rgxSplitter = re.compile('[\\s.,:;-?!()"\']+')
        sentSet = []
        for sent in filter(None, sentenceIter):
            if type(sent) == str:
                if tokenizer:
                    s = set(filter(None, tokenizer(sent)))
                else:
                    s = set(filter(None, rgxSplitter.split(sent)))
            else:
                s = set(sent)
            if len(s) < 2: continue
            self.dictCount[len(self.dictCount)] = sent
            sentSet.append(s)

        for i in range(len(self.dictCount)):
            for j in range(i + 1, len(self.dictCount)):
                s = similarity(sentSet[i], sentSet[j])
                if s < self.threshold: continue
                self.dictBiCount[i, j] = s

    def getPMI(self, a, b):
        import math
        co = self.dictNear.get((a, b), 0)
        if not co: return None
        return math.log(float(co) * self.nTotal / self.dictCount[a] / self.dictCount[b])

    def getI(self, a):
        import math
        if a not in self.dictCount: return None
        return math.log(self.nTotal / self.dictCount[a])

    def build(self):
        self.graph = networkx.Graph()
        self.graph.add_nodes_from(self.dictCount.keys())
        for (a, b), n in self.dictBiCount.items():
            self.graph.add_edge(a, b, weight=n * self.coef + (1 - self.coef))

    def rank(self):
        return networkx.pagerank(self.graph, weight='weight')

    def extract(self, ratio=0.1):
        ranks = self.rank()
        cand = sorted(ranks, key=ranks.get, reverse=True)[:int(len(ranks) * ratio)]
        pairness = {}
        startOf = {}
        tuples = {}
        for k in cand:
            tuples[(k,)] = self.getI(k) * ranks[k]
            for l in cand:
                if k == l: continue
                pmi = self.getPMI(k, l)
                if pmi: pairness[k, l] = pmi

        for (k, l) in sorted(pairness, key=pairness.get, reverse=True):
            print(k[0], l[0], pairness[k, l])
            if k not in startOf: startOf[k] = (k, l)

        for (k, l), v in pairness.items():
            pmis = v
            rs = ranks[k] * ranks[l]
            path = (k, l)
            tuples[path] = pmis / (len(path) - 1) * rs ** (1 / len(path)) * len(path)
            last = l
            while last in startOf and len(path) < 7:
                if last in path: break
                pmis += pairness[startOf[last]]
                last = startOf[last][1]
                rs *= ranks[last]
                path += (last,)
                tuples[path] = pmis / (len(path) - 1) * rs ** (1 / len(path)) * len(path)

        used = set()
        both = {}
        for k in sorted(tuples, key=tuples.get, reverse=True):
            if used.intersection(set(k)): continue
            both[k] = tuples[k]
            for w in k: used.add(w)

        # for k in cand:
        #    if k not in used or True: both[k] = ranks[k] * self.getI(k)

        return both

    def summarize(self, ratio=0.333):
        r = self.rank()
        ks = sorted(r, key=r.get, reverse=True)[:int(len(r) * ratio)]
        return ' '.join(map(lambda k: self.dictCount[k], sorted(ks)))


# tr = TextRank()
# # print('Load...')
# from konlpy.tag import Komoran

# tagger = Komoran()
# stopword = set([('있', 'VV'), ('하', 'VV'), ('되', 'VV')])
# # tr.loadSents(RawSentenceReader('test4.txt'),
# #              lambda sent: filter(lambda x: x not in stopword and x[1] in ('NNG', 'NNP', 'VV', 'VA'), tagger.pos(sent)))
# tr.loadSents(RawSentence(sys.argv[1]),
#              lambda sent: filter(lambda x: x not in stopword and x[1] in ('NNG', 'NNP', 'VV', 'VA'), tagger.pos(sent)))
# # print('Build...')
# tr.build()
# ranks = tr.rank()
# # for k in sorted(ranks, key=ranks.get, reverse=True)[:100]:
# #     print("\t".join([str(k), str(ranks[k]), str(tr.dictCount[k])]))
# print(tr.summarize(0.5))

tr = TextRank(window=5, coef=1)
# print('Load...')
stopword = set([('있', 'VV'), ('하', 'VV'), ('되', 'VV'), ('없', 'VV') ])
# tr.load(RawTaggerReader('test4.txt'), lambda w: w not in stopword and (w[1] in ('NNG', 'NNP', 'VV', 'VA')))
data = '유명 커피전문점과 인터넷 쇼핑몰에서 판매되는 스테인리스 텀블러 일부 제품에서 유해물질인 납이 다량 검출됐다.한국소비자원은 시중에서 판매 중인 텀블러 가운데 페인트로 외부를 코팅한 제품 24개를 대상으로 안전성을 조사한 결과 4개 제품에서 다량의 납이 검출됐다고 16일 밝혔다.조사 대상 텀블러는 커피전문점(9개)과 생활용품점(3개), 문구·팬시점(3개), 대형마트(4개), 온라인쇼핑몰(5개)에서 판매되는 제품 가운데 용기 외부의 표면을 페인트로 마감 처리한 제품이었다.우선 온라인쇼핑몰에서 판매되는 엠제이씨의 ‘리락쿠마 스텐 텀블러’와 파스쿠찌에서 판매되는 ‘하트 텀블러’, 할리스커피에서 판매되는 ‘뉴 모던 진공 텀블러 레드’, 다이소에서 판매되는 ‘S2019 봄봄 스텐 텀블러’의 외부 표면에서 다량의 납이 검출됐다고 소비자원은 밝혔다.납은 어린이의 지능 발달을 저하하고 식욕부진, 근육 약화 등을 유발할 수 있으며 국제암연구소에서 인체발암 가능 물질로 분류하고 있다.금속 재질의 텀블러는 표면 보호나 디자인을 위해 표면을 페인트로 마감한다. 이때 색상을 선명하게 하고 점착력을 높일 목적으로 납과 같은 유해 중금속을 첨가하는 경우가 있다.특히 표면에 납이 함유돼있으면 피부나 구강과 접촉을 통해 벗겨진 페인트를 흡입·섭취해 인체에 납이 흡수될 수 있다.그러나 식품과 접촉하는 면이 아닌 텀블러의 외부 표면에 대한 별도의 유해물질 기준은 마련돼 있지 않다.소비자원은 국내에서도 어린이 제품과 온열팩, 위생물수건 등 피부 접촉 제품에 대해서는 납 함량을 규제하고 있는 만큼 텀블러와 같은 식품 용기의 외부 표면에 대해서도 유해물질 관리 기준 마련이 필요하다고 보고 식품의약품안전처에 이를 요청하기로 했다.또 납이 검출된 4개 제품의 경우, 소비자 안전 확보를 위해 업체에서 자발적으로 판매를 중지하고 회수하기로 결정했다.실제 다이소는 이날 홈페이지 공지를 통해 소비자원 안전기준을 충족하지 못한 해당제품의 판매 중단을 결정하고 이미 구입한 소비자를 상대로 환불을 실시한다고 밝혔다.다이소는 “상품을 가지고 매장을 방문하면 구매시점과 사용여부, 구입매장, 영수중 유무, 포장개봉 여부와 관계없이 환불 조치할 것”이라고 밝혔다.'
tr.load(RawTagger(data), lambda w: w not in stopword and (w[1] in ('NNG', 'NNP', 'VV', 'VA')))
# print('Build...')
tr.build()
kw = tr.extract(0.1)
for k in sorted(kw, key=kw.get, reverse=True):
    print("%s\t%g" % (k, kw[k]))
