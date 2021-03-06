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
import Typography from '@mui/material/Typography';

const client = create('https://ipfs.infura.io:5001/api/v0');

export default function Main(props) {
    const [disable, setDisable] = useState(true);
    const [unclaimedcst, setUnclaimed] = useState(0);
    const [nfts, setNfts] = useState([]);

    const claimReward = async (event) => {
        event.preventDefault();
        
        const metadata = {
            name: "Crypto Steps Novice",
            description: "Claimed first CST reward",
            image: "https://media.istockphoto.com/vectors/happy-sprinter-man-running-very-fast-side-view-of-cartoon-runner-man-vector-id1223629616?k=20&m=1223629616&s=170667a&w=0&h=2_aX2BvDQ2gDXNj8aJhJF9WTstO7KJ4TDvDMAi092dk="
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
        async function fetchData() {
            const unclaimedcst = await unclaimedCST();
            if(unclaimedcst > 0) {
                setDisable(false);
                setUnclaimed(unclaimedcst);
            }
            const nfts = await getNFTs();
            let Nftms = [];
            for (var nft of nfts) {
                const mdata = await getNFTMetadata(nft.tokenID-1);
                mdata["tokenID"] = nft.tokenID;
                Nftms.push(mdata);
            }
            setNfts(Nftms);
            console.log("Hi");
        }
        fetchData();
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
                    <Card style={{ width: '30rem' }} className={styles}>
                    <Card.Img variant="top" alt="Not Available" src={nft.image} />
                    <hr/>
                    <Card.Body>
                        <Typography variant="h6">
                        <Card.Text>Token ID: {nft.tokenID}<br /><br />
                                {nft.description}
                            </Card.Text>
                            <Card.Title>{nft.name}</Card.Title>
                            <br />
                            </Typography>
                        </Card.Body>
                </Card>
               
                    
            ))
            }
             <br /><br />
        </div>
        </center>
        </React.Fragment>
    );
}