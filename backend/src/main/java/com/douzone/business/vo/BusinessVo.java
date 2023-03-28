package com.douzone.business.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BusinessVo {
	private String id;
	private String name;
	private String phone;
	private String ip;
	private String regDate;
	private Long userNo;
}
