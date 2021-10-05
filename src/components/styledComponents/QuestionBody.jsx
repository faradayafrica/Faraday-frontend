import React, { Component } from 'react';
import Like from './Like';

class QuestionBody extends Component {
  render() {
    return (
      <div className='question-body row'>
        {/* the question body */}
        <Like />
        <p className='question-content col'>
          Hello! Can i share my email ID with client before starting a contract?
          I need access to her shopify store and merchant center account before
          I start working with her, before checking these accounts there is no
          way I can say yes. Please suggest.
        </p>
      </div>
    );
  }
}

export default QuestionBody;
