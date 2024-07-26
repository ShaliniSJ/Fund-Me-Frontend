import { Button, FormControl, Input, FormLabel, Box } from "@mui/material";
import { getFormData } from "../utils";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { abi, contractAddress } from "../constant";

interface Props {
  // Add props here
  isMetaMaskConnected: boolean;
}

export default function FundMe(props: Props) {
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined" && props.isMetaMaskConnected) {
      setProvider(new ethers.providers.Web3Provider(window.ethereum));
    }
  }, []);

  async function sendEth(price: string) {
    const signer = provider?.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const txRes = await contract.fund({
        value: ethers.utils.parseEther(price),
      });
      console.log("transaction res", txRes);
    } catch (e: any) {
      window.alert(e.reason);
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = await getFormData(form);
    sendEth(formData.price);
  };

  return (
    <Box
      component="form"
      name="fundMe"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        width: "100%",
        maxWidth: 400,
        margin: "0 auto",
        padding: 3,
        backgroundColor: "#1e1e1e",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <FormControl fullWidth>
        <FormLabel htmlFor="price">Enter eth amount</FormLabel>
        <Input id="price" name="price" required />
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        sx={{
          padding: "12px 24px",
          textTransform: "none",
          backgroundColor: "#007bff",
          "&:hover": {
            backgroundColor: "#0056b3",
          },
        }}
      >
        Send Me Eth lol
      </Button>
    </Box>
  );
}
