#!/usr/bin/env bash
set -e

echo
echo 'About to call create() on the contract to create a project'
echo
echo \$CONTRACT is $CONTRACT
echo
near call $CONTRACT  create '{"name" : "donate to poor people" ,"address" : "mansurbestas.testnet", "funds" : "100", "description" : "Let us make good things", 
"photo":"https://www.humanosphere.org/wp-content/uploads/2015/05/15634577862_33a2f63da9_k.jpg"}' --account_id $CONTRACT 
# save the id of the created project 
echo 'Save the id of the created project so you can call it later'