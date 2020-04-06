import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './App.css';

function App() {
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

  useEffect(() => {
    onload()
  }, [])

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
    await axios.get('http://localhost/api/tindakan')
      .then(res => {
        setTindakanlist(res.data.data)
        console.log(res.data)
      })
    await axios.get('http://localhost/api/indexpendaftaran')
      .then(res => {
        setPoli(res.data.poli)
        console.log(res.data)
      })
  }

  async function pushIcd() {
    let batas = await rm.indexOf('*');
    let rmfix = await rm.substring(0, batas);
    setRmarray([...rmarray, rm])
    console.log(rm)
  }

  async function pushTindakan() {
    await setTindakanarray([...tindakanarray, tindakan])
  }

  async function pushObatjadwal() {
    await setObatfixarray([...obatfixarray, { obat, jadwal, catatan }])
    console.log(obatfixarray)
  }

  const deleteItemRm = (indexData) => {
    setRmarray(rmarray(data => data.index !== indexData))
  };

  return (
    <div style={{ padding: 20 }}>
      <div className="row">
        <div className="col-lg-6">
          <div className="row" style={{ backgroundColor: '#ecf0f1', padding: 20, marginRight: 0, marginLeft: 0 }}>
            <div className="col-md-4 ">
              <div className="card bg-c-blue order-card">
                <div className="card-block">
                  <h2 className="text-center"><span>x</span></h2>
                  <hr></hr>
                  <h6 className="text-center">Total Antrian</h6>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-c-green order-card">
                <div className="card-block">
                  <h2 className="text-center"><span>x</span></h2>
                  <hr></hr>
                  <h6 className="text-center">Antrian Dipanggil</h6>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-c-pink order-card">
                <div className="card-block">
                  <h2 className="text-center"><span>x</span></h2>
                  <hr></hr>
                  <h6 className="text-center">Antrian Tersisa</h6>
                </div>
              </div>
            </div>

            <div className="col-lg-6" style={{ marginTop: 20 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                style={{ width: '100%', height: 80 }}
              //onClick={() => panggil()}
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
              //onClick={() => panggil()}
              //className={classes.button}
              //startIcon={<SaveIcon />}
              >
                Ulang
                  </Button>
            </div>

            <div className="col-lg-12" style={{ marginTop: 20 }}>
              <div className="row">
                <div className="col-lg-12 text-center" style={{ padding:10 }}>
                  <h5>Transfer Pasien ke Poli Lainnya</h5>
                  {poli.map((data, index) =>
                    <Button variant="contained" color="primary" style={{ padding: 20, borderRadius: 0 }} disableElevation> {data.nama_pelayanan}</Button>
                  )}
                </div>

              </div>
            </div>

            <div className="col-lg-12" style={{ marginTop: 20 }}>
              <table className="table table-striped">
                <tbody>
                  <tr style={{ backgroundColor: 'black' }}>
                    <td colSpan='2' style={{ color: 'white' }}><center>Data Pasien</center></td>

                  </tr>
                  <tr>
                    <td>Nomor Rekam Medis</td>
                    <td style={{ alignItem: 'right' }}>Zul Amri Durrin Nafis</td>
                  </tr>
                  <tr>
                    <td>Nama Pasien</td>
                    <td>Otto</td>
                  </tr>
                  <tr>
                    <td>Jenis Kelamin</td>
                    <td>Otto</td>
                  </tr>
                  <tr>
                    <td>Umur</td>
                    <td>Otto</td>
                  </tr>
                  <tr>
                    <td>Alamat</td>
                    <td>Otto</td>
                  </tr>

                </tbody>
              </table>
              <button className="btn btn-info" style={{ margin: 10, width:'100%' }}>Riwayat Pasien</button>
            </div>

          </div>

        </div>
        {/* <div className="col-lg-6">
          <div className="row" style={{ backgroundColor: '#ecf0f1'}}> 
            <div className="col-lg-4" style={{ padding: 10 }}>
              <div className="card text-white bg-primary mb-3" >
                <div className="card-body">
                  <h1 className="card-title">20</h1>
                </div>
                <div className="card-footer">Total Antrian</div>
              </div>
            </div>
            <div className="col-lg-4" style={{ padding: 10 }}>
              <div className="card text-white bg-success mb-3" >
                <div className="card-body">
                  <h1 className="card-title">20</h1>
                </div>
                <div className="card-footer">Antrian Dipanggil</div>
              </div>
            </div>
            <div className="col-lg-4" style={{ padding: 10 }}>
              <div className="card text-white bg-warning mb-3" >
                <div className="card-body">
                  <h1 className="card-title">20</h1>
                </div>
                <div className="card-footer">Sisa Antrian</div>
              </div>
            </div>
          </div>
          <div className="row" style={{ backgroundColor: '#f5f6fa' }}>
            <div className="col-lg-6" style={{ padding: 20 }}>
              <button className="btn btn-primary btn-lg" style={{ width: '100%', height: 80 }}> Panggil </button>
            </div>
            <div className="col-lg-6" style={{ padding: 20 }}>
              <button className="btn btn-danger btn-lg" style={{ width: '100%', height: 80 }}> Ulang</button>
            </div>
          </div>
          <div className="row" style={{ backgroundColor: '#ecf0f1', justifyContent: 'center', alignItems: 'center' }}>
            <h5 style={{ margin: 20 }}>Transfer Pasien ke Poli Lainnya</h5>
          </div>
          <div className="row" style={{ backgroundColor: '#ecf0f1', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <div className="col-lg-3">
              <button className="btn btn-primary btn-lg" style={{ width: '100%' }}> Ulang</button>
            </div>
            <div className="col-lg-3">
              <button className="btn btn-primary btn-lg" style={{ width: '100%' }}> Ulang</button>
            </div>
            <div className="col-lg-3">
              <button className="btn btn-primary btn-lg" style={{ width: '100%' }}> Ulang</button>
            </div>
            <div className="col-lg-3">
              <button className="btn btn-primary btn-lg" style={{ width: '100%' }}> Ulang</button>
            </div>
          </div>
          <div className="card">
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td>Nomor Rekam Medis</td>
                  <td style={{ alignItem: 'right' }}>Zul Amri Durrin Nafis</td>
                </tr>
                <tr>
                  <td>Nama Pasien</td>
                  <td>Otto</td>
                </tr>
                <tr>
                  <td>Jenis Kelamin</td>
                  <td>Otto</td>
                </tr>
                <tr>
                  <td>Umur</td>
                  <td>Otto</td>
                </tr>
                <tr>
                  <td>Alamat</td>
                  <td>Otto</td>
                </tr>

              </tbody>
            </table>
            <button className="btn btn-info" style={{ margin: 10 }}>Riwayat Pasien</button>
          </div>
        </div> */}
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
                      <td>{data}</td>

                      <td><button className="btn btn-danger" onClick={() => deleteItemRm(index)}>hapus</button></td>
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
                      <td>{data}</td>
                      <td><button className="btn btn-danger" onClick={() => deleteItemRm(index)}>hapus</button></td>
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
                      <td><button className="btn btn-danger" onClick={() => deleteItemRm(index)}>hapus</button></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div >
  );
}

export default App;
