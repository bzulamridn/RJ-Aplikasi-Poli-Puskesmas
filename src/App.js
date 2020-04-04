import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './App.css';

function App() {

  const [tindakan, TindakanList] = useState([])
  const [obat, setObat] = useState([])
  const [jadwalminum, setJadwalminum] = useState([])
  const [rmlist, setRmlist] = useState([])
  const [rm, setRm] = useState('');
  const [rmarray, setRmarray] = useState([]);

  useEffect(() => {
    onload()
  }, [])

  async function onload() {
    await axios.get('http://localhost:3000/icd')
      .then(res => {
        setRmlist(res.data)
        console.log(res.data)
      })
  }

  async function pushIcd() {
    let batas = await rm.indexOf('*');
    let rmfix =  await rm.substring(0, batas);
    setRmarray([...rmarray, rmfix])
    console.log(rm)
    console.log(rmfix)
  }

  return (
    <div style={{ padding: 20 }}>
      <div className="row">
        <div className="col-lg-6">
          <div className="jumbotron" style={{ alignItems: 'center' }}>
            <h4 className="display-4 text-center">Data Pasien</h4>
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
        </div>
        <div className="col-lg-6">
          <div className="row">
            <nav className="navbar navbar-dark navbar-expand-lg bg-dark" style={{ width: '100%' }}>
              <a className="navbar-brand" href="#">
                <img src="/docs/4.4/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
                Bootstrap
            </a>
            </nav>
          </div>
          <div className="row" style={{ backgroundColor: '#ecf0f1' }}>
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

          <div className="row" style={{ marginTop: 10 }}>
            <nav className="navbar navbar-dark navbar-expand-lg bg-dark" style={{ width: '100%' }}>
              <a className="navbar-brand" href="#">
                <img src="/docs/4.4/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
                Bootstrap
            </a>
            </nav>
          </div>
          <div className="row" style={{ backgroundColor: '#ecf0f1', }}>
            <div className="col-lg-9">
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={rmlist.map((option, index) => option.icd + " * " + option.nama_penyakit)}
                onChange={(e, v) => setRm(v)}
                renderInput={(params) => (
                  <TextField {...params} label="ICD - Nama penyakit" margin="normal" variant="outlined" onChange={({ target }) => setRm(target.value)} />
                )}
              />
            </div>
            <div className="col-lg-3">
              <Button
                variant="contained"
                color="secondary"
                size="large"
                style={{ width: '100%' }}
                onClick={() => pushIcd()}
              >
                Tambah
                  </Button>
            </div>
          </div>
          <div className="row" style={{ backgroundColor: '#ecf0f1', }}>
            <div className="col-lg-12">
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">Nama Penyakit</th>
                    <th scope="col">Kode ICD</th>
                  </tr>
                </thead>
                <tbody>

                  {rmarray.map((data, index) =>
                    <tr>
                      <td>{data}</td>
                      <td>{data}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
