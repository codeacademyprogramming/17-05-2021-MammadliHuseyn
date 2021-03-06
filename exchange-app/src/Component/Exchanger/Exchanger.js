import { createRef } from 'react'
import currency from "./rates.json";

const Exchanger = () => {

    const currencyFromValRef = createRef();
    const currencyFromRef = createRef();
    const currencyToRef = createRef();
    const outputResultRef = createRef();

    const exchange = () => {
        const fromRef = currencyFromRef.current.value;
        const toRef = currencyToRef.current.value;
        const result = getResultByCurCode(fromRef, toRef);
        outputResultRef.current.value = result.toFixed(4);
    }

    const getResultByCurCode = (from, to) => {
        const curFrom = currency.find(cur => cur.code === from).value;
        const curTo = currency.find(cur => cur.code === to).value;
        const fromValRef = currencyFromValRef.current.value;
        return (curFrom / curTo) * fromValRef;
    }

    const changeInputs = () => {
        [currencyFromRef.current.value, currencyToRef.current.value]
            =
            [currencyToRef.current.value, currencyFromRef.current.value]
        exchange();
    }

    return (
        <div className="row justify-content-center ps-3 pe-3 fadeAnimate">
            <div className="col-lg-4 ">
                <div className="exchanger">
                    <div className="row">
                        <div>
                            <label>From</label>
                            <div className="d-flex justify-content-between">
                                <input defaultValue="1"
                                    type="number"
                                    ref={currencyFromValRef}
                                    onKeyUp={exchange} />
                                <select ref={currencyFromRef}
                                    defaultValue="USD"
                                    onChange={exchange}>
                                    {currency.map((cr, key) =>
                                        <option
                                            value={cr.code}
                                            key={key}>
                                            {cr.code}
                                        </option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="my-3 d-flex justify-content-around">
                            <img src={`${process.env.PUBLIC_URL}/switch.png`}
                                onClick={changeInputs} />
                        </div>
                        <div>
                            <label>To</label>
                            <div className="d-flex justify-content-between">
                                <input defaultValue="1.7002" disabled ref={outputResultRef} />
                                <select ref={currencyToRef}
                                        defaultValue="AZN"
                                        onChange={exchange}>
                                    {currency.map((cr, key) =>
                                        <option
                                            value={cr.code}
                                            key={key}>
                                            {cr.code}
                                        </option>
                                    )}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="Exchange mt-3"
                    onClick={exchange}
                >Exchange</button>
            </div>
        </div>
    )
}

export default Exchanger
