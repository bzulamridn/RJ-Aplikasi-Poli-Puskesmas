import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './App.css';

function App() {

  const [tindakan, TindakanList] = useState([])
  const [obat,setObat] =useState([])
  const [jadwalminum, setJadwalminum] =useState([])

  useEffect(() => {

  }, [])

  

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
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              options={pasienlist.map((option, index) => +index + "- " + option.rm + " " + option.nama + " " + option.bpjs)}
              onChange={(e, v) => setIndex(v)}
              renderInput={(params) => (
                <TextField {...params} label="Nomor Rekam Medis / Nama Lengkap" margin="normal" variant="outlined" onChange={({ target }) => setIndex(target.value)} />
              )}
            />

          </div>


        </div>
      </div>
    </div>
  );
}

export default App;
