
### Create an application with cra
```
cd apps
npx create-react-app main --use-npm --template file:../packages/create-app/cra-template-foundation
```

WARNING
actualy you need some more steps

1. remove node_modules folder
2. remove package-lock.json
3. clean package.json
4. run npm install from the root directory

### Build module child application module
```
cd apps/<application>
# If you just need the final build
npm run build

# If you need to enable hot relod on an pplication that use the module you are working on
npm run build --watch 
```