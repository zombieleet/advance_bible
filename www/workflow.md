### This git workflow is as follows

1. Clone this repo
2. Create a development and a next branch
3. Create a branch off the development branch `git checkout -b newFeature development`
4. If you make small commits on `newFeature` branch
5. squash all the commits with `git rebase --interactive`
6. then make a single commit message with this message `"new feature implemented to support cool stuff"`
7. If you want to make commit after implementing the feature, the commit message should be `"new feature implemented to support cool stuff"` 
8. Merge the `newFeature` branch into `next` branch to fix merge conflict
9. Merge the `newFeature` branch into `master` branch 
10. Create a pull request via github
