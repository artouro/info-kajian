import { Component, OnInit } from '@angular/core';
import { KajianService } from '../../services/kajian/kajian.service';
import { Kajian } from '../../models/Kajian';

@Component({
  selector: 'app-tambah',
  templateUrl: './tambah.component.html',
  styleUrls: ['./tambah.component.css']
})
export class TambahComponent implements OnInit {
  kajian: Kajian = {
    judul: '',
    pemateri: '',
    lokasi: '',
    tanggal: '',
    kategori: ''
  }
  constructor(private kajianService: KajianService) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.kajian.judul !== '' && this.kajian.pemateri !== '' && this.kajian.lokasi !== '' &&
    this.kajian.tanggal !== '' && this.kajian.kategori !== '') {
        this.kajianService.addKajian(this.kajian);
        this.kajian.judul = '';
        this.kajian.pemateri = '';
        this.kajian.lokasi = '';
        this.kajian.tanggal = '';
        this.kajian.kategori = '';
    }
  }

}
