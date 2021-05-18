import React, { Component } from 'react';

export class Modal extends Component {
    render() {
        // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
        const { open, close, header, footer, footer_fuction } = this.props;

        return (
            <div className={ open ? 'openModal modal': 'modal' }>
                { open ? (  
                    <section>
                        <header>
                            { header }
                            <button className="close" onClick={close}> &times; </button>
                        </header>
                        <main>
                            {this.props.children}
                        </main>
                        <footer>
                            <button className="close" onClick={footer_fuction}> {footer} </button>
                        </footer>
                    </section>
                ) : null }
            </div>
        )
    }
}


export default Modal;