// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import './Roles.sol';


contract Voting {

    using Roles for Roles.Role;

    Roles.Role private adminRole;
    Roles.Role private userRole;


    struct User {
        address key;
        string nationalId;
        bytes32 pwd;
        uint age;
        bool isActive;
    }

    struct Candidate {
        string id;
        string name;
        uint voteCount;
    }

    struct Election {
        string id;
        address[] voters;
        uint votes;
        Candidate[] candidates;
        mapping(address => bool) Voters;
    }



    mapping(string => Election) ElectionsMap;
    mapping(address => User) UsersMap;
    mapping(string => Candidate) CandidatesMap;
    // mapping(address => bool) Voters;

    Candidate[] public candidates;
    Election[] public elections;
    address[] private users;
    address adminId;
    string adminPwd;

    constructor() {
        adminId = msg.sender;
        adminRole.add(adminId);
        adminPwd = "admin";
    }

    function isAdmin() public view returns (bool){
        return adminRole.has(msg.sender);
    }

    function isVoter() public view returns (bool){
        return userRole.has(msg.sender);
    }


    function adminLogin(string memory pwd) public view returns (int){
        if (keccak256(abi.encodePacked(pwd)) == keccak256(abi.encodePacked(adminPwd))) {
            return 1;
        }
        else {
            return 0;
        }
    }

    function addElection(string memory id) public {
        require(adminRole.has(msg.sender), "only admin can add Election");
        Election storage election = ElectionsMap[id];
        election.id = id;
        election.votes = 0;

    }

    function getElection(string memory eId) public view returns (Candidate[] memory, address[] memory, uint){
        Election storage election = ElectionsMap[eId];

        return (election.candidates, election.voters, election.votes);
    }

    function addUser(string memory nationalId, string memory pwd) public {
        if (adminRole.has(msg.sender)) revert("Sesion iniciada como administrador");
        if (userRole.has(msg.sender)) revert("Already existing user");

        User storage user = UsersMap[msg.sender];
        user.nationalId = nationalId;
        user.key = msg.sender;
          // store the pwd in hashed form to avoid storing it in plain text
        user.pwd = keccak256(abi.encodePacked(pwd));
        user.isActive = false;

        users.push(msg.sender);

        userRole.add(msg.sender);
    }

    function verifyUser(address _voter) public {
        UsersMap[_voter].isActive = true;
    }

    function login(string memory nationalId, string memory pwd) public view returns (User memory){
        require(!adminRole.has(msg.sender), "Conectado como administrador");
        require(userRole.has(msg.sender), "No se encuentra registrado");

        User memory user = UsersMap[msg.sender];

        if (keccak256(abi.encodePacked(user.nationalId)) ==
        keccak256(abi.encodePacked(nationalId)) &&
            keccak256(abi.encodePacked(pwd)) == user.pwd)
            return user;
        return UsersMap[address(0)];
    }

    function getUsers() public view returns (User[] memory){
        User[] memory _users = new User[](users.length);
        for (uint i = 0; i < users.length; i++) {
            _users[i] = UsersMap[users[i]];
        }
        return _users;
    }

    function addCandidate(string memory id, string memory name, string memory eId) public {
        require(adminRole.has(msg.sender), "only admin can add Candidates");
        Candidate storage candidate = CandidatesMap[id];
        candidate.id = id;
        candidate.name = name;
        candidate.voteCount = 0;

        Election storage election = ElectionsMap[eId];
        election.candidates.push(candidate);

        candidates.push(candidate);
    }

    function getCandidates() public view returns (Candidate[] memory){
        return candidates;
    }

    function getCandidateVotes(string memory id) public view returns (uint){
        return CandidatesMap[id].voteCount;
    }

    function vote(string memory cId, string memory eId ) public {
  
        require(userRole.has(msg.sender), "Usuario no registrado");
        Election storage election = ElectionsMap[eId];
        require(!election.Voters[msg.sender], "Usted ya ha votado");
        CandidatesMap[cId].voteCount += 1;
        election.votes += 1;
        election.voters.push(msg.sender);
        election.Voters[msg.sender] = true;

        
    }

    function getResult(string memory _eId) public view returns (Candidate[] memory)  {
        Election storage _election = ElectionsMap[_eId];
        Candidate[] memory _candidates = new Candidate[](_election.candidates.length);

        for (uint i = 0; i < _election.candidates.length; i++) {
            _candidates[i] = CandidatesMap[_election.candidates[i].id];
        }

        return _candidates;
    }

    // function to verify age of voter and return true if age is greater than 18 years old and false if not 
    function verifyAge(uint age) public pure returns (bool){
        if (age >= 18) {
            
             return true;
        }
        else {
             return false;
        }
    }


    function hasVotingEnded(uint votingEndTime) public view returns (bool) {
       if (block.timestamp >= votingEndTime) {
           return true;
       } else {
           return false;
       }
    }

}