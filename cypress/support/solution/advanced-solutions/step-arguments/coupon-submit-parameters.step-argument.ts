import { Property, StepArgument, StepArgumentBase } from '../../../_common';
import { ECouponCodes } from '../coupon-codes.enum';

@StepArgument()
export class CouponSubmitParameters extends StepArgumentBase {
  @Property({ enum: ECouponCodes }) couponCode: ECouponCodes;
}
