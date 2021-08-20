import {useState} from "react";

function TestComponent() {
    const [inputList, setInputList] = useState(['']);

    // handle input change
    const handleInputChange = (e, index) => {
        const { value } = e.target;
        const list = [...inputList];
        list[index] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, '']);
    };

    return (
        <div>
            <h3><a href="https://cluemediator.com">Clue Mediator</a></h3>
            {inputList.map((x, i) => {
                return (
                    <div key={i}>
                        <input
                            name="firstName"
                            placeholder="Enter First Name"
                            value={x}
                            onChange={e => handleInputChange(e, i)}
                        />
                        {/*<input*/}

                        {/*    name="lastName"*/}
                        {/*    placeholder="Enter Last Name"*/}
                        {/*    value={x.lastName}*/}
                        {/*    onChange={e => handleInputChange(e, i)}*/}
                        {/*/>*/}
                        <div>
                            {inputList.length !== 1 && <button

                                onClick={() => handleRemoveClick(i)}>Remove</button>}
                            {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
                        </div>
                    </div>
                );
            })}
            <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
        </div>
    );
}

export default TestComponent