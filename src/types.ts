export type Donation = {
  full_name: string,
  email: string,
  date: number,
  sum: number
}

export type DonationPostBody = {
  full_name: string, 
  email: string,
  sum: number
}