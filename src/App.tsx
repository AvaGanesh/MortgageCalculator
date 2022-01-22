import React, { useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import './App.css';
import RangeSlider from 'react-bootstrap-range-slider';

function App() {
  const [purchase, setPurchase] = useState<number>(450000)
  const [downPayment, setDownPayment] = useState<number>(150000)
  const [repaymentTime, setRepaymentTime] = useState<number>(25)
  const [interestRate, setInterestRate] = useState<number>(8)
  const [loanAmount, setLoanAmount] = useState<number|undefined>(undefined)
  const [estimate, setEstimate] = useState<number|undefined>(undefined)

  const calculateLoanAmount = () => {
    // M = P[r(1+r)^n/((1+r)^n)-1)] 
    /**
     * 
    M = the total monthly mortgage payment
    P = the principal loan amount(Purchase Price - Down Payment)
    r = your monthly interest rate
    n = number of payments over the loan’s lifetime.
     */
    console.log('Reached calculate amount');
    let principalAmt = purchase - downPayment;
    let n = (12 * repaymentTime);
    let interest = (interestRate * 12)/100;
    let power = Math.pow(1+ interest, n);
    let estimate = principalAmt * ((interestRate * power)/ (power - 1));
    setLoanAmount(principalAmt);
    setEstimate(estimate);
  }
  return (
    <div className="App">
      <Container className="p-2 mt-4">
        <Card className="p-4">
          <Row>
            <h3 className='p-2'>Mortgage Calculator</h3>
          </Row>
          <Row>
            <Col>
              Purchase Price: {purchase} $
              <RangeSlider
                value={purchase}
                min={100000}
                max={1000000}
                step={50000}
                onChange={changeEvent => setPurchase(Number.parseInt(changeEvent.target.value))}
              />
            </Col>
            <Col>
              Down Payment: {downPayment} $
              <RangeSlider
                value={downPayment}
                min={1000}
                max={200000}
                step={10000}
                onChange={changeEvent => setDownPayment(Number.parseInt(changeEvent.target.value))}
              />
            </Col>
            <Col>
              Repayment Time: {repaymentTime} {repaymentTime === 1 ? 'year': 'years'}
              <RangeSlider
                value={repaymentTime}
                min={1}
                max={50}
                step={5}
                onChange={changeEvent => setRepaymentTime(Number.parseInt(changeEvent.target.value))}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              Interest Rate: {interestRate} %
              <RangeSlider
                value={interestRate}
                min={1}
                max={25}
                step={1}
                onChange={changeEvent => setInterestRate(Number.parseInt(changeEvent.target.value))}
              />
            </Col>
            <Col lg={4} className='pt-2 mt-3'>
              Loan Amount:
              {loanAmount ? loanAmount + '$' : '' }
            </Col>
            <Col lg={4} className='pt-2 mt-3'>
              Estimated Per month:
              { estimate ? estimate + '$': ''}
            </Col>
          </Row>
          <Row>
            <div className='p-2 ml-2'>
              <Button onClick={event => calculateLoanAmount()}>Calculate</Button>
            </div>
          </Row>
        </Card>
      </Container>
    </div>
  );
}

export default App;
