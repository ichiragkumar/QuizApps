


Functionalities:
Create a Quiz:
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
