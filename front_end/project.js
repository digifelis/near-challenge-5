var baglan_button = document.getElementById("baglan");
var pay1_button = document.getElementById("pay-1");


var contract;
var wallet;

async function load() {
    /* connect near */
    const near = await new nearApi.Near({
        keyStore: new nearApi.keyStores.BrowserLocalStorageKeyStore(),
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org'
    });
    // connect to the NEAR Wallet
    wallet = new nearApi.WalletConnection(near, 'hesapmakinasi');
    // connect to a NEAR smart contract
    contract = new nearApi.Contract(wallet.account(), 'dev-1651111427025-71600221442385', {
        viewMethods: ['getProject', 'listOfProjects', 'listOfIdProject', 'getNumberOfProjects', 'getFundedProjectsNumber'],
        changeMethods: ['create', 'deleteProjectById', 'updateFund', 'donateForPoject']
    });
    if (wallet.isSignedIn()) {
        baglan_button.textContent = 'sign out   ' + wallet.getAccountId();
    }

}


load().then(async () => {
    await getProjects().then( async () => {
        getProjectId();
    })

});

async function getProjectId() {
    document.onclick = function (e) {
        
        if (e.target.tagName == "BUTTON") {
            var project_id = e.target.getAttribute("project_id");
            var project_fund_amount = e.target.getAttribute("project_fund_amount");
            console.log(project_fund_amount);
            startDonate(project_id, project_fund_amount);

        }
    }
}

async function startDonate(project_id, project_fund_amount) {
    var response = await contract.donateForPoject({
            "accountId": wallet.getAccountId(),
            "id": parseInt(project_id),
            "funds": project_fund_amount
        },
        "300000000000000",
        project_fund_amount
    )
    alert(response);
}
async function getProjects() {
    var response = await contract.listOfProjects({})
    const project_list = document.getElementById("project_list");

    console.log(response.length)
    for (i in response) {
        let html = `<div class="feature col" id="project-${response[i].id}">
        <img src="${response[i].photo}" width="150px" height="150px"></img>

        <h2>${response[i].name}</h2>
        <h6>Fund: ${response[i].funds}</h3>
        <h6>Received: ${response[i].received}</h3>
        <h6>Residual: ${response[i].residual}</h3>
        <p>${response[i].description}</p>
        <p>
        <button class="btn btn-warning" id="pay-1" project_id="${response[i].id}" project_fund_amount="1000000000000000000000000" >Donate 1 NEAR</button>
        <button class="btn btn-warning" id="pay-5" project_id="${response[i].id}" project_fund_amount="5000000000000000000000000" >Donate 5 NEAR</button>
        </p>
    </div>`
        project_list.insertAdjacentHTML("beforeend", html);
        console.log(response[i].id)
    }
}


baglan_button.addEventListener('click', async function () {
    console.log(wallet);
    if (!wallet.isSignedIn()) {
        wallet.requestSignIn(
            "dev-1651111427025-71600221442385" // contract address
        );
    } else {
        wallet.signOut();
        baglan_button.textContent = "sign in";
    }
});

/*
pay1_button.addEventListener('click', async function(){


})
*/