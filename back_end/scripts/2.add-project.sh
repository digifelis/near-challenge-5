#!/usr/bin/env bash
set -e

echo
echo 'About to call create() on the contract to create a project'
echo
echo \$CONTRACT is $CONTRACT
echo
near call $CONTRACT  create '{"name" : "plant trees" ,"address" : "mansurbestas.testnet", "funds" : "500", "description" : "Let us make the environment cleaner", "photo":"https://www.clipartmax.com/png/full/80-800867_tree-google-images-poster-planting-trees-png.png"}' --account_id $CONTRACT 
# save the id of the created project 
echo 'Save the id of the created project so you can call it later'