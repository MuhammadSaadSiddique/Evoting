const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
    let Greeter;
    let greeter;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function () {
        Greeter = await ethers.getContractFactory("Greeter");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        greeter = await Greeter.deploy();
        await greeter.deployed();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await greeter.owner()).to.equal(owner.address);
        });
    });

    describe("createElection", function () {
        it("Should allow the owner to create an election", async function () {
            await greeter.createElection("Presidential Election", ["Candidate 1", "Candidate 2"], ["Party A", "Party B"]);
            expect(await greeter.totalElections()).to.equal(1);
            expect(await greeter.totalCandidates()).to.equal(2);
        });

        it("Should not allow non-owners to create an election", async function () {
            await expect(
                greeter.connect(addr1).createElection("Gubernatorial Election", ["Candidate 3", "Candidate 4"], ["Party C", "Party D"])
            ).to.be.revertedWith("You do not have the administrative rights to create elections");
        });
    });

    describe("castVote", function () {
        it("Should allow a user to cast a vote", async function () {
            await greeter.createElection("Mayoral Election", ["Candidate 5"], ["Party E"]);
            const electionId = await greeter.electionIds(0);
            const candidateId = await greeter.candidateIds(0);

            await greeter.connect(addr1).castVote(electionId, candidateId);

            expect(await greeter.electionTotalVotes(electionId)).to.equal(1);
            expect(await greeter.candidateTotalVotes(candidateId)).to.equal(1);
        });

        it("Should not allow voting for a candidate not in the election", async function () {
            await greeter.createElection("Senate Election", ["Candidate 6"], ["Party F"]);
            const electionId = await greeter.electionIds(0);

            await expect(
                greeter.connect(addr1).castVote(electionId, 999) // Assuming 999 is not a valid candidate ID
            ).to.be.revertedWith("This candidate is not a recognized participant for this election");
        });
    });

    describe("View Functions", function () {
        beforeEach(async function() {
            await greeter.createElection("House Election", ["Candidate 7", "Candidate 8"], ["Party G", "Party H"]);
        });

        it("Should return the correct total elections", async function () {
            expect(await greeter.totalElections()).to.equal(1);
        });

        it("Should return the correct total candidates", async function () {
            expect(await greeter.totalCandidates()).to.equal(2);
        });

        it("Should return correct election total votes", async function() {
            const electionId = await greeter.electionIds(0);
            const candidateId = await greeter.candidateIds(0);
            await greeter.connect(addr1).castVote(electionId, candidateId);
            await greeter.connect(addr2).castVote(electionId, candidateId);
            expect(await greeter.electionTotalVotes(electionId)).to.equal(2);
        });

        it("Should return correct candidate total votes", async function() {
            const electionId = await greeter.electionIds(0);
            const candidateId1 = await greeter.candidateIds(0);
            const candidateId2 = await greeter.candidateIds(1);
            await greeter.connect(addr1).castVote(electionId, candidateId1);
            await greeter.connect(addr2).castVote(electionId, candidateId2);
            expect(await greeter.candidateTotalVotes(candidateId1)).to.equal(1);
            expect(await greeter.candidateTotalVotes(candidateId2)).to.equal(1);
        });
    });
});