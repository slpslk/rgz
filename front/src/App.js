import Web3 from "web3"
import {useState, useEffect} from "react"
import MyContract from "./contracts/MyContract.json"
import './App.css';


function App() {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });

  const [data, setData] = useState("nill")

  useEffect(() => {
    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");

    async function template() {
      const web3 = new Web3(provider);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = MyContract.networks[networkId];
      const contract = new web3.eth.Contract(
        MyContract.abi,
        deployedNetwork.address
      );
      //console.log(contract);//сущность контрактра
      setState({ web3: web3, contract: contract });
    }
    provider && template();
  }, []);

  //console.log(state)
  function get_data()
  {
    const { contract } = state;
    async function readData() {
      const data = await contract.methods.getter().call();
      console.log("piska:" + data)
      setData(data);      
    }
    contract && readData();
  }

  useEffect(() => {
    get_data()
  }, [state]);

  

  //console.log(data)
  function print_data() {
    const sf = document.querySelector("#selectfrom").value
    const st = document.querySelector("#selectto").value
    const am = document.querySelector("#amount").value
    const select = sf + "/" + st;
    console.log("siska " + Number(data)/1000)
        
    document.querySelector("#required").innerHTML = "Required amount: " + am + " ( "+ select + " )"
    document.querySelector("#recieved").innerHTML = "Recieved amount: " + am*(Number(data)/1000)
  }
  

  async function writeData(){
    const sf = document.querySelector("#selectfrom").value
    const st = document.querySelector("#selectto").value
    const amount = document.querySelector("#amount").value
    
    if (sf != st)
    {
      if (amount > 0)
      {
        const { contract } = state;
        const select = sf + "/" + st;
        //console.log(select)
        await contract.methods.setter_amount(select).send({from: "0xFD053822e544BFd24A092012d3EF4f744c53bE48", gas: "1000000"})
        get_data()
        
      }
      else{
        alert("Amount must be positive number")
      }
    }
    else{
      alert("Select different currents")
    }
  }
  return (
    <div className="App">
      <div className="Main">
        <div className="input"> 
          <div className="selector">
            <select id = "selectfrom">
              <option value="USD">USD</option>
              <option value="RUB">RUB</option>
              <option value="EUR">EUR</option>
            </select>

            <select id = "selectto">
              <option value="USD">USD</option>
              <option value="RUB">RUB</option>
              <option value="EUR">EUR</option>
            </select>
            
          </div>
          <div className="amount">
            <input id="amount" type="text" placeholder="Type your amount" required></input> 
          </div>
          <div className="senbutton">
            <button onClick = {writeData}>Check button</button>
          </div>
          <div className="printbutton">
            <button onClick = {print_data}>Print</button>
          </div>
        </div>

        <div className="output"> 
          <div id="required">  </div>
          <div id="recieved"> </div>
        </div>
      </div>
    </div>
  );
}

export default App;
