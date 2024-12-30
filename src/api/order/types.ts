export class Order {
  _id: string = '';
  created_at: string = '';
  updated_at: string = '';
  estimated_time_order: string = '';
  brand_id: string = '';
  branch_id: string = '';
  computer_id: string = '';
  customer_id: string = '';
  employee_id: string = '';
  employee_confirm_id: string = '';
  employee_cancel_id: string = '';
  employee_confirm_payment_id: string = '';
  note: string = '';
  reason: string = '';
  status: number = 0;
  payment_method: number = 0;
  payment_status: number = 0;
  total_amount: string = '';
 

  constructor(initialValues: Partial<Order> = {}) {
    Object.assign(this, initialValues);
  }
}