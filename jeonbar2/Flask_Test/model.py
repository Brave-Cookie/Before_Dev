# coding: utf-8
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()



class LogInfo(db.Model):
    __tablename__ = 'log_info'

    meeting_id = db.Column(db.ForeignKey('meeting_info.meeting_id'), primary_key=True, nullable=False, index=True)
    user_id = db.Column(db.ForeignKey('user_info.user_id'), primary_key=True, nullable=False, index=True)
    log_time = db.Column(db.String(10), nullable=False)
    log_feeling = db.Column(db.String(10), nullable=False)
    log_text = db.Column(db.String(100), nullable=False)

    meeting = db.relationship('MeetingInfo', primaryjoin='LogInfo.meeting_id == MeetingInfo.meeting_id', backref='log_infos')
    user = db.relationship('UserInfo', primaryjoin='LogInfo.user_id == UserInfo.user_id', backref='log_infos')



class MeetingInfo(db.Model):
    __tablename__ = 'meeting_info'

    meeting_id = db.Column(db.Integer, primary_key=True)
    meeting_name = db.Column(db.String(20), nullable=False)
    meeting_date = db.Column(db.DateTime, nullable=False)

    projects = db.relationship('ProjectInfo', secondary='project_meeting', backref='meeting_infos')



class ProjectInfo(db.Model):
    __tablename__ = 'project_info'

    project_id = db.Column(db.Integer, primary_key=True)
    project_name = db.Column(db.String(50), nullable=False)

    users = db.relationship('UserInfo', secondary='user_project', backref='project_infos')


class ProjectIssue(ProjectInfo):
    __tablename__ = 'project_issue'

    project_id = db.Column(db.ForeignKey('project_info.project_id'), primary_key=True, index=True)
    issue_content = db.Column(db.String(100), nullable=False)



t_project_meeting = db.Table(
    'project_meeting',
    db.Column('meeting_id', db.ForeignKey('meeting_info.meeting_id'), primary_key=True, nullable=False, index=True),
    db.Column('project_id', db.ForeignKey('project_info.project_id'), primary_key=True, nullable=False, index=True)
)



class Test(db.Model):
    __tablename__ = 'test'

    num = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(45), nullable=False)



class UserInfo(db.Model):
    __tablename__ = 'user_info'

    user_id = db.Column(db.String(20), primary_key=True)
    user_pw = db.Column(db.String(20), nullable=False)
    user_email = db.Column(db.String(30), nullable=False)
    user_name = db.Column(db.String(10), nullable=False)



t_user_project = db.Table(
    'user_project',
    db.Column('user_id', db.ForeignKey('user_info.user_id'), primary_key=True, nullable=False, index=True),
    db.Column('project_id', db.ForeignKey('project_info.project_id'), primary_key=True, nullable=False, index=True)
)
