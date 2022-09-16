package com.ssafy.gorda.service;


import com.ssafy.gorda.domain.Donation;
import com.ssafy.gorda.repository.DonationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)

public class DonationService {

    private final DonationRepository donationRepository;

    //등록

    @Transactional
    public String regist(Donation donation) {

        donationRepository.regist(donation);

        return "Loc : DonationService - 기부 등록완료";

    }

    //찾기

    public Donation findByIdx (String Idx) {

        return donationRepository.findByIdx(Idx);

    }

}