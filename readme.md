## Check The Documentation
https://documenter.getpostman.com/view/26021685/2sA3Boargt


## Functionalities:


### Create a Quiz:
     Users can create quizzes by sending a POST request to /quizzes 
    endpoint.
     Required fields in the request body: 
    o question: The text of the question.
    o options: An array of strings representing answer options.
    o rightAnswer: The index of the correct answer in the options 
    array (starting from 0).
    o startDate: The date and time (ISO format) when the quiz should 
    start.
    o endDate: The date and time (ISO format) when the quiz should 
    end.
### Get Active Quiz:
     Users can retrieve the currently active quiz (within the start and 
    end time) by sending a GET request to /quizzes/active.
     The response should include the quiz data, including current status

### Get Quiz Result:
     After 5 minutes of the quiz's end time, users can retrieve the quiz 
    result by sending a GET request to /quizzes/:id/result, where :id is 
    the quiz's unique identifier.
     The response should include the correct answer and additional 
    information if needed.

### Get All Quizzes:
     Users can retrieve all quizzes (including inactive and finished) by 
    sending a GET request to /quizzes/all.
     The response should include a list of quiz objects with relevant 
    information.
