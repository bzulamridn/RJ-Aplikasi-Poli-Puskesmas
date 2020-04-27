import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import { Modal } from 'react-bootstrap';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
import 'moment/locale/id'  // without this line it didn't work
moment.locale('id')


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

toast.configure({
  autoClose: 5000,
  draggable: true,
  //etc you get the idea
});


function App() {
  const classes = useStyles();
  const [isLogin, setLogin] = useState(false);
  const [isPageLoading, setIspageloading] = useState(false)
  const [rmlist, setRmlist] = useState([])
  const [rm, setRm] = useState('');
  const [rmarray, setRmarray] = useState([]);
  const [obatlist, setObatlist] = useState([]);
  const [obat, setObat] = useState('');
  const [jadwalList, setJadwallist] = useState([]);
  const [jadwal, setJadwal] = useState([])
  const [obatfixarray, setObatfixarray] = useState([]);
  const [catatan, setCatatan] = useState('');
  const [tindakanlist, setTindakanlist] = useState([]);
  const [tindakan, setTindakan] = useState('');
  const [tindakanarray, setTindakanarray] = useState([]);
  const [poli, setPoli] = useState([])
  const [kodeFaskes, setKodeFaskes] = useState('')
  const [usernamepoli, setUsernamepoli] = useState('')
  const [passwordpoli, setPasswordpoli] = useState('')
  const [total, setTotal] = useState('')
  const [dipanggil, setDipanggil] = useState('')
  const [sisa, setSisa] = useState('')
  const [kodepoli, setKodepoli] = useState('')
  const [namaPoli, setNamapoli] = useState('')
  const [dokter, setDokter] = useState('')
  const [urlapi, setUrlapi] = useState('')
  const [onesignalid, setOnesignalid] = useState('')
  const [onesignalsec, setOnesignalsec] = useState('')
  const [pasien, setPasien] = useState([])
  const [dataantrian, setDataantrian] = useState([])
  const [idkunjungan, setIdkunjungan] = useState('')
  const [riwayatpasien, setRiwayatpasien] = useState([])
  const [modalshow, setModalshow] = useState(false)
  const [dokterlist, setDokterlist] = useState([])
  const [printerlist, setPrinterlist] = useState([])
  const [printer, setPrinter] = useState('')


  useEffect(() => {
    RealTime()
  })

  async function login() {
    await axios.get('http://localhost:3000/faskesbyid/' + kodeFaskes)
      .then(res => {
        if (res.data.length === 0) {
          alert("Kode Faskes Salah")
        } else {
          setUrlapi(res.data[0].local_api)
          loginpoli(res.data[0].local_api)
          setOnesignalid(res.data[0].onesignalid)
          setOnesignalsec(res.data[0].onesignalsec)
        }
      })
  }

  async function loginpoli(url) {
    await axios.get(url + 'loginpoliapi/' + usernamepoli + "/" + passwordpoli)
      .then(res => {
        console.log("data Pasien")
        setKodepoli(res.data.data.kode_antrian)
        setDokter(res.data.data.nama)
        setNamapoli(res.data.data.nama_pelayanan)
        indexpoli(res.data.data.kode_antrian, url)
        console.log(res.data)
        onload()
        setLogin(true)
      }
      )
  }

  async function indexpoli(kode, url) {
    await axios.get(url + 'indexpoli/' + kode)
      .then(res => {
        setTotal(res.data.data.total)
        setDipanggil(res.data.data.dipanggil)
        setSisa(res.data.data.sisa)
        setTindakanlist(res.data.tindakan)
        setDokterlist(res.data.dokter)
        setPrinterlist(res.data.printer)
        setPoli(res.data.poli)
        console.log(res.data)
      }
      )
  }

  async function onload() {
    await axios.get('http://localhost:3000/icd')
      .then(res => {
        setRmlist(res.data)
        console.log(res.data)
      })
    await axios.get('http://localhost:3000/obat')
      .then(res => {
        setObatlist(res.data)
        console.log(res.data)
      })
    await axios.get('http://localhost:3000/jadwal')
      .then(res => {
        setJadwallist(res.data)
        console.log(res.data)
      })
    // await axios.get('http://localhost/api/indexpendaftaran')
    //   .then(res => {
    //     setPoli(res.data.poli)
    //     console.log(res.data)
    //   })
  }

  async function RealTime() {
    if (isLogin === true) {
      setInterval(() => {
        getAntrianRelatime()
      }, 60000)
    } else {

    }
  }

  async function getAntrianRelatime() {
    await axios.get(urlapi + 'indexpoli/' + kodepoli)
      .then(res => {
        setTotal(res.data.data.total)
        setDipanggil(res.data.data.dipanggil)
        setSisa(res.data.data.sisa)
      }
      )
  }

  function panggil() {
    axios.get(urlapi + 'panggilpoli/' + kodepoli + "/" + onesignalid + "/" + onesignalsec)
      .then(res => {
        if (res.data.sisa === '0') {
          toast.error("Antrian Habis", {
            position: toast.POSITION.TOP_RIGHT
          });
        } else {
          console.log("data 2")
          console.log(res.data)
          setTotal(parseInt(res.data.dipanggil) + parseInt(res.data.sisa))
          setDipanggil(res.data.dipanggil)
          setSisa(res.data.sisa)
          setDataantrian(res.data.data)
          getPasienbyId(res.data.data[0].id_pasien)
          console.log("data Antrian")
          console.log(dataantrian)
          setRmarray([])
          setTindakanarray([])
          setObatfixarray([])
          toast.success("Antrian Berhasil di panggil", {
            position: toast.POSITION.TOP_RIGHT
          });
        }
      })
  }

  function ulang(){
    axios.get(urlapi + 'ulangpanggilpoli/' + kodepoli + "/" + dipanggil + "/" + onesignalid + "/" + onesignalsec)
    .then(res => {
      if(res.data.status === '1'){
        toast.success("Antrian Berhasil di panggil", {
          position: toast.POSITION.TOP_RIGHT
        });
      }else{
        toast.error("Antrian Habis", {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    })
  }

  function simpanriwayatpasien() {
    if (pasien.rm === undefined) {
      toast.error("Data Pasien Kosong", {
        position: toast.POSITION.TOP_RIGHT
      });
    } else {
      axios.post('http://localhost:3000/createriwayatpasien/', {
        norm: pasien.rm,
        poli: namaPoli,
        namadokter: dokter,
        kodefaskes: kodeFaskes,
        obatpasien: obatfixarray,
        icd: rmarray,
        tindakan: tindakanarray
      })
        .then(res => {
          if (res.data.status === '1') {
            toast.success("Barhasil Menyimpan data Pasien", {
              position: toast.POSITION.TOP_RIGHT
            });
          } else {
            toast.error("Ada Kesalahan", {
              position: toast.POSITION.TOP_RIGHT
            });
          }
        })
    }

  }

  async function getriwayat() {
    if (pasien.rm === undefined) {
      toast.error("Belum ada data Pasien", {
        position: toast.POSITION.TOP_RIGHT
      });
    } else {
      await axios.get('http://localhost:3000/getrm/' + pasien.rm)
        .then(res => {
          setRiwayatpasien(res.data)
          console.log(res.data)
          setModalshow(true)
        })
    }

  }

  function getPasienbyId(id) {
    axios.get('http://localhost:3000/pasienbyid/' + id)
      .then(res => {
        console.log(res.data)
        setPasien(res.data[0])
      })
  }

  function transferpasien(kodepolix) {
    if (pasien.rm === undefined) {
      toast.error("Belum ada data Pasien", {
        position: toast.POSITION.TOP_RIGHT
      });
    } else {
      console.log(pasien.rm)
      axios.get(urlapi + 'antrianpoliapi/' + pasien.rm + '/' + pasien.rm + '/' + kodepolix)
        .then(res => {
          console.log(res.data)
          const open = window.open("http://localhost/printpos/printtransfer.php?nomor=" + res.data.antrian + "&printer=" + printer, '_blank', 'location=yes,height=100,width=100,scrollbars=yes,status=yes');
          setTimeout(() => { open.close() }, 5000);
        })
    }
  }

  async function pushIcd() {
    if (rm === '') {
      toast.error("Silahkan Pilih Penyakit", {
        position: toast.POSITION.TOP_RIGHT
      });
    } else {
      let batas = await rm.indexOf('*');
      let kodeicd = await rm.substring(0, batas);
      setRmarray([...rmarray, { kodeicd, rm }])
      console.log(rmarray)
    }
  }

  async function pushTindakan() {
    if (tindakan === '') {
      toast.error("Silahkan Pilih Tindakan", {
        position: toast.POSITION.TOP_RIGHT
      });
    } else {
      await setTindakanarray([...tindakanarray, { tindakan }])
      console.log(tindakanarray)
    }
  }

  async function pushObatjadwal() {
    if (obat === '' || jadwal === '') {
      toast.error("Silahkan Pilih Obat dan Jadwal", {
        position: toast.POSITION.TOP_RIGHT
      });
    } else {
      await setObatfixarray([...obatfixarray, { obat, jadwal, catatan }])
      console.log(obatfixarray)
    }

  }

  const deleteItemRm = (indexData) => {
    setRmarray(rmarray(data => data.index !== indexData))
  };

  return (
    <>
      {isLogin ? (
        <>
          <div style={{ padding: 20 }}>
            <div className="row">
              <div className="col-lg-6">
                <div class="alert alert-primary" role="alert">
                  <div className="row">
                    <div className="col-md-4 text-right">
                      {kodeFaskes} - {namaPoli}
                    </div>
                    <div className="col-md-4">

                      <select
                        style={{ width: '100%' }}
                        value={dokter}
                        onChange={({ target }) => setDokter(target.value)}
                      >
                        <option value=""> Dokter </option>
                        {dokterlist.map((data, index) =>
                          <option value={data.nama}> {data.nama} </option>
                        )}
                      </select>
                    </div>
                    <div className="col-md-4 text-right">
                      {moment().format('dddd')}, {moment().format('LL')}
                    </div>
                  </div>
                </div>
                <div className="row" style={{ backgroundColor: '#ecf0f1', padding: 20, marginRight: 0, marginLeft: 0 }}>
                  <div className="col-md-4 ">
                    <div className="card bg-c-blue order-card">
                      <div className="card-block">
                        <h2 className="text-center" style={{ marginTop: 10 }}><span>{total}</span></h2>
                        <hr></hr>
                        <h6 className="text-center">Total Antrian</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card bg-c-green order-card">
                      <div className="card-block">
                        <h2 className="text-center" style={{ marginTop: 10 }}><span>{dipanggil}</span></h2>
                        <hr></hr>
                        <h6 className="text-center">Antrian Dipanggil</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card bg-c-pink order-card">
                      <div className="card-block">
                        <h2 className="text-center" style={{ marginTop: 10 }}><span>{sisa}</span></h2>
                        <hr></hr>
                        <h6 className="text-center">Antrian Tersisa</h6>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6" style={{ marginTop: 20 }} >
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      style={{ width: '100%', height: 80 }}
                      onClick={() => panggil()}
                    //className={classes.button}
                    //startIcon={<SaveIcon />}
                    >
                      Panggil
                  </Button>
                  </div>
                  <div className="col-lg-6" style={{ marginTop: 20 }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      style={{ width: '100%', height: 80 }}
                     onClick={() => ulang()}
                    //className={classes.button}
                    //startIcon={<SaveIcon />}
                    >
                      Ulang
                  </Button>
                  </div>
                  <hr></hr>
                  <div className="col-lg-12" style={{ marginTop: 50 }}>
                    <table className="table table-striped">
                      <tbody>
                        <tr style={{ backgroundColor: 'black' }}>
                          <td colSpan='2' style={{ color: 'white' }}><center>Data Pasien</center></td>

                        </tr>
                        <tr>
                          <td>Nomor Rekam Medis</td>
                          <td style={{ alignItem: 'right' }}>{pasien.rm}</td>
                        </tr>
                        <tr>
                          <td>Nama Pasien</td>
                          <td>{pasien.nama}</td>
                        </tr>
                        <tr>
                          <td>Jenis Kelamin</td>
                          <td>{pasien.jenis_kelamin}</td>
                        </tr>
                        <tr>
                          <td>Umur</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Alamat</td>
                          <td>{pasien.alamat}</td>
                        </tr>

                      </tbody>
                    </table>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      style={{ width: '100%' }}
                      onClick={() => getriwayat()}
                    >
                      Riwayat Pasien
                  </Button>

                    <div className="row" style={{ borderWidth: 1 }}>
                      <div className="col-lg-12" style={{ marginTop: 20 }}>
                        <div className="row">
                          <div className="col-lg-12" style={{ padding: 10 }}>
                            <div class="alert alert-danger" role="alert">
                              Transfer Pasien ke Pelayanan Lainnya
                              <div style={{ alignItems:'flex-end' }}>
                              <select
                                value={printer}
                                onChange={({ target }) => setPrinter(target.value)}
                              >
                                
                                <option value=""> Printer </option>
                                {printerlist.map((data, index) =>
                                  <option value={data.nama_printer}> {data.loket} </option>
                                )}
                              </select>
                              <Button color="inherit">Test Printer</Button>
                              </div>
                            </div>
                            {poli.map((data, index) =>
                              <Button variant="contained" color="primary" onClick={() => transferpasien(data.kode_antrian)} style={{ padding: 20, borderRadius: 0 }} disableElevation> {data.nama_pelayanan}</Button>
                            )}
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <Modal
                  show={modalshow}
                  onHide={() => setModalshow(false)}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Riwayat Pasien</Modal.Title>
                  </Modal.Header>
                  <Modal.Body >
                    <div className="row" style={{ paddingRight: 30, paddingLeft: 30 }}>
                      {riwayatpasien.map((data, index) =>
                        <div className="col-lg-12" style={{ padding: 20, marginTop: 20, border: '1px solid black' }}>

                          {data.kunjungan.map((datakunjungan, index) =>

                            <table style={{ boderBottom: '1px solid black' }}>
                              <tbody style={{ fontWeight: 'bold' }}>
                                <tr>
                                  <td style={{ width: 200, color: 'red' }}>Tanggal Kunjungan</td>
                                  <td style={{ color: 'red' }}>{moment(datakunjungan.created_at).format('LL')}</td>
                                </tr>
                                <tr>
                                  <td style={{ width: 200 }}>Nomor Rekam Medis</td>
                                  <td>{datakunjungan.no_rm}</td>
                                </tr>
                                <tr>
                                  <td style={{ width: 200 }}>Nama Faskes </td>
                                  <td>{datakunjungan.id_faskes}/ {data.faskes[0].nama_faskes}</td>
                                </tr>
                                <tr>
                                  <td style={{ width: 200 }}>Dokter</td>
                                  <td>{datakunjungan.dokter}</td>
                                </tr>
                              </tbody>
                            </table>

                          )}
                          <h6 style={{ marginTop: 20, marginBottom: 10, fontWeight: 'bold' }}>1. Data Diagnosa Penyakit</h6>
                          <table className="table table-striped">
                            <thead className="thead-dark">
                              <tr>
                                <th>Kode ICD</th>
                                <th>Nama Penyakit</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.datadiagnosa.map((datadiagnosa, index) =>
                                <tr>
                                  <td>{datadiagnosa.icd}</td>
                                  <td>{datadiagnosa.nama_penyakit}</td>
                                </tr>
                              )}
                            </tbody>
                          </table>

                          <h6 style={{ marginTop: 20, marginBottom: 10, fontWeight: 'bold' }}>2. Data Tindakan Dokter</h6>
                          <table className="table table-striped">
                            <thead className="thead-dark">
                              <tr>
                                <th>Nama Tindakan</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.datatindakan.map((datatindakan, index) =>
                                <tr>
                                  <td>{datatindakan.tindakan}</td>
                                </tr>
                              )}
                            </tbody>
                          </table>

                          <h6 style={{ marginTop: 20, marginBottom: 10, fontWeight: 'bold' }}>3. Data Obat yang Diberikan</h6>
                          <table className="table table-striped">
                            <thead className="thead-dark">
                              <tr>
                                <th>Nama Obat</th>
                                <th>Aturan</th>
                                <th>Catatan</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.dataobat.map((dataobat, index) =>
                                <tr>
                                  <td>{dataobat.nama_obat}</td>
                                  <td>{dataobat.aturan}</td>
                                  <td>{dataobat.catatan}</td>
                                </tr>
                              )}
                            </tbody>
                          </table>

                        </div>

                      )}
                    </div>
                  </Modal.Body>
                </Modal>



              </div>

              <div className="col-lg-6">

                <div className="row">
                  <nav className="navbar navbar-dark navbar-expand-lg bg-dark" style={{ width: '100%' }}>
                    <a className="navbar-brand" href="#">
                      <img src="/docs/4.4/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
                Diagnosa Penyakit
            </a>
                  </nav>
                </div>
                <div className="row" style={{ backgroundColor: '#ecf0f1', }}>
                  <div className="col-lg-12">
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      options={rmlist.map((option, index) => option.icd + " * " + option.nama_penyakit)}
                      onChange={(e, v) => setRm(v)}
                      renderInput={(params) => (
                        <TextField {...params} label="ICD - Nama penyakit" margin="normal" variant="outlined" onChange={({ target }) => setRm(target.value)} style={{ backgroundColor: 'white' }} />
                      )}
                    />
                  </div>
                  <div className="col-lg-12" style={{ marginBottom: 10 }}>
                    <Button
                      variant="contained"
                      color="default"
                      size="large"
                      style={{ width: '100%' }}
                      onClick={() => pushIcd()}
                    >
                      Tambah
              </Button>
                    <hr></hr>
                  </div>

                </div>
                <div className="row" style={{ backgroundColor: '#ecf0f1', }}>
                  <div className="col-lg-12">
                    <table class="table">
                      <thead class="thead-light ">
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">Nama Penyakit</th>

                        </tr>
                      </thead>
                      <tbody>

                        {rmarray.map((data, index) =>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{data.rm}</td>
                            <td><button className="btn btn-danger" onClick={() => setRmarray(rmarray.filter(data => data.index !== data.index))}>Hapus</button></td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="row" style={{ marginTop: 10 }}>
                  <nav className="navbar navbar-dark navbar-expand-lg bg-dark" style={{ width: '100%' }}>
                    <a className="navbar-brand" href="#">
                      <img src="/docs/4.4/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
                Tindakan Dokter
            </a>
                  </nav>
                </div>
                <div className="row" style={{ backgroundColor: '#ecf0f1', }}>
                  <div className="col-lg-12">
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      options={tindakanlist.map((option, index) => option.id + " * " + option.nama_tindakan)}
                      onChange={(e, v) => setTindakan(v)}
                      renderInput={(params) => (
                        <TextField {...params} label="Tindakan Dokter" margin="normal" variant="outlined" onChange={({ target }) => setTindakan(target.value)} style={{ backgroundColor: 'white' }} />
                      )}
                    />
                  </div>
                  <div className="col-lg-12" style={{ marginBottom: 10 }}>
                    <Button
                      variant="contained"
                      color="default"
                      size="large"
                      style={{ width: '100%' }}
                      onClick={() => pushTindakan()}
                    >
                      Tambah
              </Button>
                    <hr></hr>
                  </div>

                </div>

                <div className="row" style={{ backgroundColor: '#ecf0f1', }}>
                  <div className="col-lg-12">
                    <table class="table">
                      <thead class="thead-light ">
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">Nama Penyakit</th>
                          <th scope="col">Kode ICD</th>
                        </tr>
                      </thead>
                      <tbody>

                        {tindakanarray.map((data, index) =>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{data.tindakan}</td>
                            <td><button className="btn btn-danger" onClick={() => setTindakanarray(tindakanarray.filter(data => data.index !== data.index))}>Hapus</button></td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="row" style={{ marginTop: 10 }}>
                  <nav className="navbar navbar-dark navbar-expand-lg bg-dark" style={{ width: '100%' }}>
                    <a className="navbar-brand" href="#">
                      <img src="/docs/4.4/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
                Resep Obat
            </a>
                  </nav>
                </div>
                <div className="row" style={{ backgroundColor: '#ecf0f1', }}>
                  <div className="col-lg-4">
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      options={obatlist.map((option, index) => option.nama_obat)}
                      onChange={(e, v) => setObat(v)}
                      renderInput={(params) => (
                        <TextField {...params} label="Nama Obat" margin="normal" variant="outlined" onChange={({ target }) => setObat(target.value)} style={{ backgroundColor: 'white' }} />
                      )}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      options={jadwalList.map((option, index) => option.text)}
                      onChange={(e, v) => setJadwal(v)}
                      renderInput={(params) => (
                        <TextField {...params} label="Jadwal Minum" margin="normal" variant="outlined" onChange={({ target }) => setJadwal(target.value)} style={{ backgroundColor: 'white' }} />
                      )}
                    />
                  </div>
                  <div className="col-lg-4">
                    <TextField label="Catatan" margin="normal" style={{ width: '100%' }} onChange={({ target }) => setCatatan(target.value)} variant="outlined" style={{ backgroundColor: 'white' }} />
                  </div>
                  <div className="col-lg-12" style={{ marginBottom: 10 }}>
                    <Button
                      variant="contained"
                      color="default"
                      size="large"
                      style={{ width: '100%' }}
                      onClick={() => pushObatjadwal()}
                    >
                      Tambah
              </Button>
                    <hr></hr>
                  </div>
                </div>
                <div className="row" style={{ backgroundColor: '#ecf0f1', }}>
                  <div className="col-lg-12">
                    <table class="table">
                      <thead class="thead-light">
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">Nama Obat</th>
                          <th scope="col">Aturan</th>
                          <th scope="col">Catatan</th>
                          <th scope="col">#</th>
                        </tr>
                      </thead>
                      <tbody>

                        {obatfixarray.map((data, index) =>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{data.obat}</td>
                            <td>{data.jadwal}</td>
                            <td>{data.catatan}</td>
                            <td><button className="btn btn-danger" onClick={() => setObatfixarray(obatfixarray.filter(data => data.index !== data.index))}>Hapus</button></td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="row" style={{ backgroundColor: '#ecf0f1', }}>
                  <div className="col-lg-12">
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      style={{ width: '100%' }}
                      onClick={() => simpanriwayatpasien()}
                    >
                      Simpan Data Pasien
                  </Button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </>
      ) : (
          <Container component="main" maxWidth="xs">

            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>

              </Avatar>
              <Typography component="h1" variant="h5">
                Login Form
        </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="ID Fasilitas Kesehatan"
                  onChange={({ target }) => setKodeFaskes(target.value)}
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  onChange={({ target }) => setUsernamepoli(target.value)}
                  label="Username Poli"
                  type="text"

                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  onChange={({ target }) => setPasswordpoli(target.value)}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => login()}
                >
                  Login
          </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Silahkan Menghubungi Admin Jika Lupa Password
              </Link>
                  </Grid>

                </Grid>
              </form>
            </div>

          </Container>
        )}
    </>
  );
}

export default App;
