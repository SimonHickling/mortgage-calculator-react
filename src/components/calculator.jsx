import React from "react";
import './calculator.css'
import { useState, useEffect } from "react";




const Calculator = () => {


    const[amount, setAmount] = useState('');
    const[term, setTerm] = useState('');
    const[interest, setInterest] = useState('')
    const[repayment, setRepayment] = useState(null);
    const [mortgageType, setMortgageType] = useState('repayment')
    const [hideResultsText, setHideResultsText] = useState(false);
    const [totalRepayment, setTotalRepayment] = useState(null);

    const [amountError, setAmountError] = useState(false);
    const [termError, setTermError] = useState(false);
    const [interestError, setInterestError] = useState(false);

    const handleCalculation = () => {
        setHideResultsText(true);

        const amt = parseFloat(amount);
        const trm = parseFloat(term);
        const int = parseFloat(interest) / 100;

        setAmountError(!amount);
        setTermError(!term);
        setInterestError(!interest);

        if (!amount || !term || !interest) {
            setRepayment("");
            return;
            }

        if(!isNaN(amt) && !isNaN(trm) && trm !== 0 && !isNaN(int)) {
           let result;
    if (mortgageType === 'repayment') {
      // full repayment formula
      result = (amt * int * Math.pow(1 + int, trm)) / (Math.pow(1 + int, trm) - 1) / 12;
    } else if (mortgageType === 'interest') {
      // interest-only monthly payment
      result = (amt * int) / 12;
    }
    setRepayment(result.toFixed(2));
    setTotalRepayment((result * trm * 12).toFixed(2));
  } else {
    setRepayment("Invalid Input");
  }
    }



    return(
        <>
        <div className="calculator-app">
            <div className="input-container">
                <h2>Mortgage Calculator</h2>
                <button type="reset" className="clear-btn" id="clear-btn" onClick={() => window.location.reload()}>Clear All</button>
                <form className="input-form">
                    <label className="input-label" for="amount">Mortgage Amount</label><br />
                    <div className="input-unit-container">
                         <span className="unit-container" id="pound">£</span>
                        <input type="number" className="amount" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)}></input>
                        <br />
                    </div>
                    <span className={`required-error ${amountError ? 'error' : ''}`}>This field is required</span>
                    <fieldset className="term-percent-field">
                        <label className="input-label term-label" for="term">Mortgage Term</label>
                        <div className="input-unit-container">
                            <input className="term" type="number" id="term" max={50} value={term} onChange={(e) => setTerm(e.target.value)}></input>
                            <span className="unit-container" id="unit">years</span><br />
                        </div>
                        <span className={`required-error term-error ${termError ? 'error' : ''}`}>This field is required</span>
                        <label className="input-label interest-label" for="term">Interest Rate</label>
                        <div className="input-unit-container">
                            <input className="interest" type="number" id="interest" max={100} value={interest} onChange={(e) => setInterest(e.target.value)}></input>
                            <span className="unit-container" id="unit">%</span><br />
                        </div>
                        <span className={`required-error interest-error ${interestError ? 'error' : ''}`}>This field is required</span>
                    </fieldset>
                    <fieldset className="radio-field">
                        <label className="input-label" for="type">Mortgage Type</label>
                        <div className="radio-container"><input type="radio" name="type" value="repayment"className="repayment" id="repayment" checked={mortgageType === 'repayment'} onChange={(e) => setMortgageType(e.target.value)}></input><span>Repayment</span></div>
                        <div className="radio-container"><input type="radio" name="type" value="interest" className="interest-only" id="interest-only" checked={mortgageType === 'interest'} onChange={(e) => setMortgageType(e.target.value)}></input><span>Interest Only</span></div>
                        <span className="required-error">This field is required</span>
                    </fieldset>
                    <button className="submit" type="button" id="submit" onClick={handleCalculation}>
                        <img src="./images/icon-calculator.svg" alt="Calculator Icon"></img>
                        Calculate Repayments
                    </button>
                </form>
            </div>
            <div className="output-container">
                
                <div className="results-container">
                    <div className="pre-results">
                        <div className={`results-image-wrapper ${hideResultsText ? 'hidden' : ''}`}>
                            <img src="./images/illustration-empty.svg" alt="Results Empty"></img>
                        </div>
                        <h2 className={`results-header ${hideResultsText ? 'hidden' : ''}`}>Results shown here</h2>
                        <p className={`results-text ${hideResultsText ? 'hidden' : ''}`}>Complete the form and click "Calculate Repayments" to see what your monthly payments should be</p>
                    </div>
                    
                    <h2 className={`results-header ${hideResultsText ? '' : 'hidden'}`}>Your results</h2>
                    
                    <p className={`results-text ${hideResultsText ? '' : 'hidden'}`}>Your results are shown below, based on the information you provided. To adjust the result, 
                        edit the form and click "Calculate Repayments" again
                    </p>
                    <div id="repayment-result-container" className={`repayment-result-container results-text ${hideResultsText ? '' : 'hidden'}`}>
                        <p>Your monthly repayments</p>
                        <h3 className="monthly-payments">£{repayment}</h3>
                        <hr />
                        <p>Total you'll repay over the term</p>
                        <h4 className="total-payment">£{totalRepayment}</h4>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Calculator