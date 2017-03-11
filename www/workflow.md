### This git workflow is as follows

1. Clone this repo
2. Create a development and a next branch
3. Create a branch off the development branch 
	1. `git checkout -b newFeature development`
	[x] If you make small commits on `newFeature` branch
		[x] squash all the commits with `git rebase --interactive`
		[x] then make a single commit message with this message `"new feature implemented to support cool stuff"`
	[x] If you want to make commit after implementing the feature, the commit message should be `"new feature implemented to support cool stuff"` 
4. Merge the `newFeature` branch into `next` branch to fix merge conflict
5. Merge the `newFeature` branch into `master` branch 
6. Create a pull request via github
