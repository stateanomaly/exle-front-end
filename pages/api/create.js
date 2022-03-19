import axios from 'axios'

const proxy = async (req, res) => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/createLendFund'
  await axios
    .post(url, req.body)
    .then(() => res.json({ ok: true }))
    .catch(err => res.json({ ok: false, err: err, msg: err.message }))
}
export default proxy
