# coding: utf-8
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()



t_log_info = db.Table(
    'log_info',
    db.Column('meeting_id', db.ForeignKey('meeting_info.meeting_id'), nullable=False, index=True),
    db.Column('user_id', db.ForeignKey('user_info.user_id'), nullable=False, index=True),
    db.Column('log_time', db.DateTime, nullable=False),
    db.Column('log_feeling', db.String(10), nullable=False),
    db.Column('log_text', db.String(100), nullable=False)
)



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



t_project_issue = db.Table(
    'project_issue',
    db.Column('project_id', db.ForeignKey('project_info.project_id'), nullable=False, index=True),
    db.Column('issue_content', db.String(100), nullable=False)
)



t_project_meeting = db.Table(
    'project_meeting',
    db.Column('meeting_id', db.ForeignKey('meeting_info.meeting_id'), nullable=False, index=True),
    db.Column('project_id', db.ForeignKey('project_info.project_id'), nullable=False, index=True)
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
    db.Column('user_id', db.ForeignKey('user_info.user_id'), nullable=False, index=True),
    db.Column('project_id', db.ForeignKey('project_info.project_id'), nullable=False, index=True)
)
