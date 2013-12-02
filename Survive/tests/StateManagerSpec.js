describe("game.stateMgr", function () {
    var stateMgr;

    beforeEach(function () {
        stateMgr = game.stateMgr;
        stateMgr.selectExplorer(null);
    });

    it("should return null for the selected explorer when called for the first time.", function () {
        var exp = stateMgr.getSelectedExplorer();
        expect(exp).toBeNull();
    });
    
    it("should return the explorer if is exists.", function () {
        var exp = stateMgr.getSelectedExplorer();
        expect(exp).toBeNull();
        stateMgr.selectExplorer({});
        exp = stateMgr.getSelectedExplorer();
        expect(exp).not.toBeNull();
    });
    

    // the tests fail without a call to 'stateMgr.selectExplorer(null)' in the beforeEach section
    // we should rethink how we want this object to behave. 
    // maybe a reset() function.
    it("should return null again for the selected explorer. when first initialized.", function () {
        var exp = stateMgr.getSelectedExplorer();
        expect(exp).toBeNull();
    });
});

// todo: continue refactoring game.stateMgr + add tests.