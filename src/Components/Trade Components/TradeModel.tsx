import { FunctionComponent } from "react";
import styles from "./TradeModel.module.css";

type TradeModelType = {
  onClose?: () => void;
};

export const TradeModel: FunctionComponent<TradeModelType> = ({ onClose }) => {
  return (
    <div className={styles.tradeModelDiv}>
      <div className={styles.hostTradeDiv}>
        <img className={styles.avatarImg22} alt="" src="avatar-img-22@2x.png" />
        <img className={styles.avatarImg1} alt="" src="avatar-img-11@2x.png" />
        <div className={styles.hostInformationDiv}>
          <div className={styles.heroProtagonistDiv}>Hero Protagonist</div>
          <div
            className={styles.formingTheSuperheroAcadamy}
          >{`Forming the Superhero Acadamy `}</div>
        </div>
        <div className={styles.tradeContentDiv}>
          <button className={styles.acceptButton} onClick={onClose}>
            <div className={styles.declineOfferDiv}>Decline Offer</div>
          </button>
          <div className={styles.contractWidgetDiv}>
            <i className={styles.contractsI}>Contracts</i>
            <img
              className={styles.rectangleIcon}
              alt=""
              src="rectangle-41.svg"
            />
            <div className={styles.guestWalletDiv}>
              <b className={styles.addToTrade}>Add to Trade</b>
            </div>
            <div className={styles.guestWalletDiv1}>
              <b className={styles.addToTrade}>Add to Trade</b>
            </div>
            <div className={styles.guestWalletDiv2} />
            <div className={styles.guestWalletDiv3} />
            <b className={styles.readMoreB}>Read More...</b>
            <b className={styles.readMoreB1}>Read More...</b>
            <b className={styles.puffTheMagicDragon}>Puff the magic Dragon</b>
            <b className={styles.randomHeroAcadamyNFT}>
              Random Hero Acadamy NFT
            </b>
            <div className={styles.livesByTheSea}>Lives by the sea</div>
            <div className={styles.allRaritiesAreStillAvailab}>
              All rarities are still available
            </div>
          </div>
          <div className={styles.termsAndConditionsWidget}>
            <div className={styles.termsConditions}>{`Terms & Conditions`}</div>
            <img
              className={styles.rectangleIcon1}
              alt=""
              src="rectangle-411.svg"
            />
            <div className={styles.guestWalletDiv4}>
              <b className={styles.addToTrade}>Read More...</b>
            </div>
            <div className={styles.guestWalletDiv5}>
              <b className={styles.addToTrade}>Auto-Trade...</b>
            </div>
            <div className={styles.guestWalletDiv6}>
              <b className={styles.addToTrade}>Return Policy...</b>
            </div>
            <div className={styles.nameDiv}>Name</div>
            <div className={styles.profileImageDiv}>Profile Image</div>
            <div className={styles.destinationAddressDiv}>
              Destination Address
            </div>
            <div className={styles.realWorldLocation}>Real World Location</div>
            <div className={styles.medicalHistoryDiv}>Medical History</div>
            <div className={styles.optionalDiv}>Optional</div>
            <div className={styles.rectangleDiv} />
            <div className={styles.rectangleDiv1} />
            <div className={styles.rectangleDiv2} />
            <div className={styles.rectangleDiv3} />
            <div className={styles.rectangleDiv4} />
            <img className={styles.lineIcon} alt="" src="line-49.svg" />
            <img className={styles.lineIcon1} alt="" src="line-51.svg" />
            <img className={styles.lineIcon2} alt="" src="line-53.svg" />
            <img className={styles.lineIcon3} alt="" src="line-55.svg" />
            <img className={styles.lineIcon4} alt="" src="line-57.svg" />
            <img className={styles.lineIcon5} alt="" src="line-59.svg" />
            <img className={styles.lineIcon6} alt="" src="line-50.svg" />
            <img className={styles.lineIcon7} alt="" src="line-52.svg" />
            <img className={styles.lineIcon8} alt="" src="line-54.svg" />
            <img className={styles.lineIcon9} alt="" src="line-56.svg" />
            <img className={styles.lineIcon10} alt="" src="line-58.svg" />
            <img className={styles.lineIcon11} alt="" src="line-60.svg" />
            <div className={styles.dataProvidedDiv}>Data Provided:</div>
          </div>
          <div className={styles.guestWalletDiv7}>
            <div className={styles.tradeHistoryDiv}>Trade History</div>
          </div>
          <div className={styles.tradeContentWidget}>
            <div className={styles.tradeContentDiv1}>Trade Content</div>
            <div className={styles.guestWalletDiv8}>
              <b className={styles.b}>$256.99</b>
              <div className={styles.currentTotalDiv}>Current Total</div>
            </div>
            <img
              className={styles.rectangleIcon2}
              alt=""
              src="rectangle-42.svg"
            />
            <div className={styles.guestWalletDiv9} />
            <b className={styles.orangeCreamSodaPowerUp}>
              Orange Cream Soda Power-up
            </b>
            <div className={styles.purachaseAmount25699}>
              <p className={styles.purachaseAmount256991}>
                Purachase amount 256.99
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.guestTradeDiv}>
        <img
          className={styles.securityBackgroundIcon}
          alt=""
          src="security-background@2x.png"
        />
        <img
          className={styles.avatarImg211}
          alt=""
          src="avatar-img21-1@2x.png"
        />
        <div className={styles.guestInformationDiv}>
          <div className={styles.heroProtagonistDiv}>Phillip J. Guy</div>
          <div className={styles.formingTheSuperheroAcadamy}>
            Package Delivery Man
          </div>
        </div>
        <div className={styles.tradeContentDiv2}>
          <div className={styles.acceptButtonDiv}>
            <div className={styles.acceptOfferDiv}>Accept Offer</div>
          </div>
          <div className={styles.contractWidgetDiv1}>
            <img
              className={styles.rectangleIcon3}
              alt=""
              src="rectangle-412.svg"
            />
            <div className={styles.contractsDiv}>Contracts</div>
            <div className={styles.clickOrDragThisAreaToUpl}>
              Click or drag this area to upload
            </div>
            <div className={styles.supportsJSONContractDataGe}>
              Supports JSON Contract data generated by Truffle and Hardhat. JSON
              File should contain ABI, Address and Contract Name
            </div>
            <div className={styles.lineDiv} />
            <img className={styles.lineIcon12} alt="" src="line-39.svg" />
            <img className={styles.lineIcon13} alt="" src="line-40.svg" />
            <div className={styles.lineDiv1} />
            <div className={styles.lineDiv2} />
            <div className={styles.lineDiv3} />
            <div className={styles.lineDiv4} />
            <div className={styles.lineDiv5} />
            <img className={styles.lineIcon14} alt="" src="line-46.svg" />
            <img className={styles.lineIcon15} alt="" src="line-47.svg" />
            <div className={styles.lineDiv6} />
          </div>
          <div className={styles.termsAndConditionsWidget1}>
            <div
              className={styles.termsConditions1}
            >{`Terms & Conditions`}</div>
            <img
              className={styles.rectangleIcon4}
              alt=""
              src="rectangle-413.svg"
            />
            <div className={styles.nameDiv1}>Name</div>
            <div className={styles.profileImageDiv1}>Profile Image</div>
            <div className={styles.destinationAddressDiv1}>
              Destination Address
            </div>
            <div className={styles.realWorldLocation1}>Real World Location</div>
            <div className={styles.medicalHistoryDiv1}>Medical History</div>
            <div className={styles.dataProvidedDiv1}>Data Provided:</div>
            <div className={styles.guestWalletDiv10}>
              <b className={styles.readMoreB3}>Read More...</b>
            </div>
            <div className={styles.rectangleDiv5} />
            <div className={styles.rectangleDiv6} />
            <div className={styles.rectangleDiv7} />
            <div className={styles.rectangleDiv8} />
            <div className={styles.rectangleDiv9} />
            <img className={styles.lineIcon16} alt="" src="line-491.svg" />
            <img className={styles.lineIcon17} alt="" src="line-511.svg" />
            <img className={styles.lineIcon18} alt="" src="line-531.svg" />
            <img className={styles.lineIcon19} alt="" src="line-501.svg" />
            <img className={styles.lineIcon20} alt="" src="line-521.svg" />
            <img className={styles.lineIcon21} alt="" src="line-541.svg" />
          </div>
          <div className={styles.tradeContentWidget1}>
            <div className={styles.tradeContentDiv1}>Trade Content</div>
            <div className={styles.guestWalletDiv11}>
              <b className={styles.b}>$256.99</b>
              <div className={styles.currentTotalDiv}>Current Total</div>
            </div>
            <div className={styles.guestWalletDiv12}>
              <div className={styles.tradeHistoryDiv}>Add Token</div>
            </div>
            <img
              className={styles.rectangleIcon5}
              alt=""
              src="rectangle-414.svg"
            />
            <img
              className={styles.rectangleIcon6}
              alt=""
              src="rectangle-421.svg"
            />
            <div className={styles.subtotalDiv}>Subtotal</div>
            <div className={styles.mastercard6097Div}>Mastercard ..6097</div>
            <div className={styles.phillipJGuy1}>Phillip j. Guy</div>
            <div className={styles.phillipJGuy2}>Phillip j. Guy</div>
            <div className={styles.x912764539324574569456Div}>
              0x912764539324574569456
            </div>
            <b className={styles.b2}>$256.99</b>
            <img
              className={styles.avatarImg2111}
              alt=""
              src="avatar-img21-11@2x.png"
            />
            <img className={styles.lineIcon22} alt="" src="line-61.svg" />
            <img className={styles.lineIcon23} alt="" src="line-62.svg" />
          </div>
        </div>
      </div>
    </div>
  );
};
