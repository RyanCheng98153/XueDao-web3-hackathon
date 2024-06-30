module test_demo::ProfileManager {
    use sui::object::{UID, new};
    use sui::tx_context::{TxContext, sender};
    use sui::transfer;
    use sui::balance::{Self, Balance};
    use sui::sui::SUI;
    use std::vector;

    const MAX_TEXT_LENGTH: u64 = 512;
    const ETextOverflow: u64 = 0;

    public struct Profile has key, store {
        id: UID,
        address: address,
        username: vector<u8>,
        bio: vector<u8>,
        age: u8,
        gender: vector<u8>,
        balance: Balance<SUI>,
    }

    public entry fun create_profile(
        username: vector<u8>,
        bio: vector<u8>,
        age: u8,
        gender: vector<u8>,
        ctx: &mut TxContext
    ) {
        assert!(vector::length(&username) <= MAX_TEXT_LENGTH, ETextOverflow);
        assert!(vector::length(&bio) <= MAX_TEXT_LENGTH, ETextOverflow);
        assert!(vector::length(&gender) <= MAX_TEXT_LENGTH, ETextOverflow);

        let profile = Profile {
            id: new(ctx),
            address: sender(ctx),
            username,
            bio,
            age,
            gender,
            balance: balance::zero(),
        };

        transfer::transfer(profile, sender(ctx));
    }
}
