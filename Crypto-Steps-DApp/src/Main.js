import React, {
    useState,
    useEffect
} from "react";
import "./App.css";
import styles from "./nfts.css";
import { create } from 'ipfs-http-client';
import { 
    claimRewards,
    unclaimedCST,
    getNFTs,
    getTokenURI
} from "./utils/web3-methods";
import {Card} from "react-bootstrap";

const client = create('https://ipfs.infura.io:5001/api/v0');

export default function Main(props) {
    const [disable, setDisable] = useState(true);
    const [unclaimedcst, setUnclaimed] = useState(0);
    const [nfts, setNfts] = useState([]);

    const claimReward = async (event) => {
        event.preventDefault();
        
        const metadata = {
            name: "",
            description: "",
            image: ""
        }
        const metadataString = JSON.stringify(metadata);
        let uri;
        try {
            const added = await client.add(metadataString);
            uri = `https://ipfs.infura.io/ipfs/${added.path}`;
        } catch (error) {
            console.log('Error uploading file: ', error);
        }
        await claimRewards(uri);
        window.alert("Successfully claimed " + unclaimedcst.toString() + "CST");
    }

    const getNFTMetadata = async (id) => {
        const uri = await getTokenURI(id);
        let resp = await fetch(uri);
        let metadata = await resp.json();
        return metadata;
    }
    
    useEffect(() => {
        async function fetch() {
            const unclaimedcst = await unclaimedCST();
            if(unclaimedcst > 0) {
                setDisable(false);
                setUnclaimed(unclaimedcst);
            }
            const nfts = await getNFTs();
            let Nftms = [];
            for (var nft of nfts) {
                const mdata = await getNFTMetadata(nft.tokenID);
                mdata["tokenID"] = nft.tokenID;
                Nftms.push(mdata);
            }
            setNfts(Nftms);
        }
        fetch();
    }, [disable, unclaimedcst]);

    return(
        <React.Fragment>
        <h1 className="heading">Claim your Rewards</h1>
        <br/>
        <h2 className="rew">{unclaimedcst.toString()} CST</h2>
        <br/><br/>
        <center>
        <button  
            className="BackupButton"           
            style={{
                margin: "10px",
                backgroundColor: "tomato",
            }}            
            disabled={disable}
            onClick={claimReward}
        >
            Claim
        </button>
        <br/><br/><br/><br/><br/><br/>
        {nfts.length > 0 &&
            <div className="n-heading">
                <h1>Your NFTs</h1>
                <br />
            </div>
        }
            <div className={styles.band}>
            {nfts.map((nft, key) => (
                    <Card style={{ width: '18rem' }} className={styles}>
                        <Card.Img variant="top" alt="Not Available" src={nft.image} />
                        <Card.Body>
                            <Card.Title>{nft.name}</Card.Title>
                            <Card.Text>Token ID: {nft.tokenID}<br /><br />
                                {nft.description}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    
            ))
            }
            
        </div>
        </center>
        </React.Fragment>
    );
}