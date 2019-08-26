[![Build Status](https://travis-ci.org/SrMoffat/MyDiary.svg?branch=ch-refactor-tests)](https://travis-ci.org/SrMoffat/MyDiary)
[![Coverage Status](https://coveralls.io/repos/github/SrMoffat/MyDiary/badge.svg?branch=ch-refactor-tests)](https://coveralls.io/github/SrMoffat/MyDiary?branch=ch-refactor-tests)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1035762f60c44fc4a83ed5900b7eeecd)](https://www.codacy.com/app/SrMoffat/MyDiary?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=SrMoffat/MyDiary&amp;utm_campaign=Badge_Grade)
[![Maintainability](https://api.codeclimate.com/v1/badges/f981ab50b5790bf90bab/maintainability)](https://codeclimate.com/github/SrMoffat/MyDiary/maintainability)

# sms-management-api
An SMS management API built with NodeJS and Express. Allows consumers to send, receive, and monitor an sms. 

## Models
`User`
```
person sending sms
person receiving sms
```

`SMS`
```
message of sms
sms status
```

`Contact`
```
name of person
phone number of person
```

## Features
- [x] Link all Sms sent by a Contact to the User
- [x] Deleting a contact removes the messages they sent and references to messages they received.
