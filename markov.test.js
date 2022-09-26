const { MarkovMachine } = require("./markov");

describe('markov machine', function(){
    test('makes chains', function(){
        let mm = new MarkovMachine("This is a test");

        expect(mm.chains).toEqual(new Map([
            ["This", ["is"]],
            ["is", ["a"]],
            ["a", ["test"]],
            ["test", [null]],
        ]));
    });

    test('chooses from array', function(){
        expect(MarkovMachine.choice(["test"])).toEqual("test");
        expect(["This", "is", "a", "test"])
            .toContain(MarkovMachine.choice(["This", "is", "a", "test"]));
    });

    test('generates correct text', function(){
        let mm = new MarkovMachine("This is a test");
        let text = mm.makeText();

        expect(["This is a test", "is a test", "a test", "test"])
            .toContain(text);
    });

    test('stops at correct length', function(){
        let mm = new MarkovMachine("This is a test");
        let result = mm.makeText(1);
        let resultWords = result.split(/[ \r\n]+/);

        expect([1]).toContain(resultWords.length);
    });

})