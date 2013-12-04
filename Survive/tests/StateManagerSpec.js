describe("game.stateMgr", function () {
    var stateMgr;

    beforeEach(function () {
        stateMgr = game.stateMgr;
        stateMgr.setSelectedEntity(null);
    });

    it("should return null for the selected entity when called for the first time.", function () {
        var entity = stateMgr.getSelectedEntity();
        expect(entity).toBeNull();
    });
    
    it("should return the entity if is exists.", function () {
        var entity = stateMgr.getSelectedEntity();
        expect(entity).toBeNull();
        stateMgr.setSelectedEntity({});
        entity = stateMgr.getSelectedEntity();
        expect(entity).not.toBeNull();
    });
    

    // the tests fail without a call to 'stateMgr.setSelectedEntity(null)' in the beforeEach section
    // we should rethink how we want this object to behave. 
    // maybe a reset() function.
    it("should return null again for the selected entity. when first initialized.", function () {
        var entity = stateMgr.getSelectedEntity();
        expect(entity).toBeNull();
    });
});

// todo: continue refactoring game.stateMgr + add tests.