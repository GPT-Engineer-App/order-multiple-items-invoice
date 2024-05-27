import React, { useState } from "react";
import { Container, VStack, HStack, Text, Input, Button, IconButton, Table, Thead, Tbody, Tr, Th, Td, useToast } from "@chakra-ui/react";
import { FaTrash, FaPlus } from "react-icons/fa";

const Index = () => {
  const [items, setItems] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const toast = useToast();

  const addItem = () => {
    if (itemName && itemPrice) {
      setItems([...items, { name: itemName, price: parseFloat(itemPrice) }]);
      setItemName("");
      setItemPrice("");
    } else {
      toast({
        title: "Error",
        description: "Please enter both item name and price.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const getTotal = () => {
    return items.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const generateInvoice = () => {
    if (customerName && items.length > 0) {
      toast({
        title: "Invoice Generated",
        description: `Invoice for ${customerName} with total amount $${getTotal()}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setCustomerName("");
      setItems([]);
    } else {
      toast({
        title: "Error",
        description: "Please enter customer name and add at least one item.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Order System</Text>
        <Input placeholder="Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
        <HStack spacing={2} width="100%">
          <Input placeholder="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
          <Input placeholder="Item Price" type="number" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
          <IconButton aria-label="Add Item" icon={<FaPlus />} onClick={addItem} />
        </HStack>
        <Table variant="simple" width="100%">
          <Thead>
            <Tr>
              <Th>Item Name</Th>
              <Th isNumeric>Price</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item, index) => (
              <Tr key={index}>
                <Td>{item.name}</Td>
                <Td isNumeric>${item.price.toFixed(2)}</Td>
                <Td>
                  <IconButton aria-label="Remove Item" icon={<FaTrash />} onClick={() => removeItem(index)} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Text fontSize="xl">Total: ${getTotal()}</Text>
        <Button colorScheme="teal" onClick={generateInvoice}>
          Generate Invoice
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
