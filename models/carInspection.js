const mongoose = require('mongoose')
const { dbBorongBoil } = require('../db/connection')
const Double = require('@mongoosejs/double')

const carInspectionSchema = new mongoose.Schema({
  informasi_umum: {
    cl_id: {
      type: String,
      required: true,
      trim: true
    },
    no_polisi: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    merk: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    model: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    varian: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    transmisi: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    tipe_body: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    tahun: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    isi_silinder: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    no_rangka: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    no_mesin: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    warna_eksterior_interior: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    bahan_interior: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    bahan_bakar: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    odometer: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    pajak_berlaku_sampai: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    kepemilikan: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    tangan_pertama: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    km_servis_terakhir: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    tanggal_servis_terakhir: {
      type: String,
      required: false,
      trim: true,
      default: null
    }
  },
  major_incident: {
    terdeteksi_bekas_banjir: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    terdeteksi_bekas_tabrakan_besar: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    catatan: {
      type: String,
      required: false,
      trim: true,
      default: null
    }
  },
  dokumen: {
    stnk: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    faktur: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    bpkb: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    fisik_sesuai_dokumen: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    catatan: {
      type: String,
      required: false,
      trim: true,
      default: null
    }
  },
  fitur: {
    airbag: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    audio: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    power_window: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    power_steering: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    ac: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    central_lock: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    electric_mirror: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    rem_abs: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    catatan: {
      type: String,
      required: false,
      trim: true,
      default: null
    }
  },
  data_ban: {
    tipe_velg: {
      depan_kiri: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      depan_kanan: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      belakang_kiri: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      belakang_kanan: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      cadangan: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      catatan: {
        type: String,
        required: false,
        trim: true,
        default: null
      }
    },
    ketebalan_ban: {
      depan_kiri: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      depan_kanan: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      belakang_kiri: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      belakang_kanan: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      cadangan: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      catatan: {
        type: String,
        required: false,
        trim: true,
        default: null
      }
    }
  },
  interior: {
    dashboard_kelistrikan: {
      diagnosis_komputer: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      setir: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      switch_lampu: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      panel_dashboard: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      lampu_plafon: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      panel_indikator: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      klakson: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      switch_wiper: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      lampu_hazard: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      catatan: {
        type: String,
        required: false,
        trim: true,
        default: null
      }
    },
    instrumen: {
      rem_tangan: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      spion_tengah: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      pembuka_bagasi: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      sun_visor: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      pembuka_kap_mesin: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      pembuka_tangki_bensin: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      catatan: {
        type: String,
        required: false,
        trim: true,
        default: null
      }
    },
    jok_trim: {
      jok_depan: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      sabuk_pengaman: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      trim_interior: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      handle_pintu: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      karpet_dasar: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      jok_belakang: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      console_box: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      kaca_film: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      plafon: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      bau_interior: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      catatan: {
        type: String,
        required: false,
        trim: true,
        default: null
      }
    }
  },
  eksterior: {
    body: {
      fender_kanan: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      pintu_depan_kanan: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      pintu_belakang_kanan: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      lisplang_kanan: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      quarter_panel_kanan: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      quarter_panel_kiri: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      pintu_belakang_kiri: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      pintu_depan_kiri: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      lisplang_kiri: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      fender_kiri: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      pintu_bagasi: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      bemper_belakang: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      kap_mesin: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      bemper_depan: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      panel_atap: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      grill: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      catatan: {
        type: String,
        required: false,
        trim: true,
        default: null
      }
    },
    kaca_lampu: {
      daun_wiper: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      kaca_depan: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      kaca_jendela: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      kaca_belakang: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      spion_lampu_depan: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      lampu_belakang: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      catatan: {
        type: String,
        required: false,
        trim: true,
        default: null
      }
    },
    under_body: {
      ban: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      velg: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      disc_brake: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      brake_pad: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      master_rem: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      shockbreaker: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      link_stabilizer: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      upper_lower_arm: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      karet_boot: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      crossmember: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      ball_joint: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      knalpot: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      catatan: {
        type: String,
        required: false,
        trim: true,
        default: null
      }
    }
  },
  mesin: {
    oli_dan_cairan: {
      oli_mesin: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      oli_transmisi_at: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      oli_rem: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      oli_power_steering: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      air_radiator: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      catatan: {
        type: String,
        required: false,
        trim: true,
        default: null
      }
    },
    ruang_mesin: {
      cover_klep: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      cover_timing_chain: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      transmisi_pompa: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      power_steering: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      dinamo_starter: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      alternator_pengisian_accu: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      water_pump: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      kompresor_ac: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      belt: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      fan: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      radiator: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      kondensor: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      selang: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      kabel: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      getaran_mesin: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      suara_mesin: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      stabil: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      karter_oli: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      gardan: {
        type: String,
        required: false,
        trim: true,
        default: null
      },
      catatan: {
        type: String,
        required: false,
        trim: true,
        default: null
      }
    }
  },
  tambahan_kelengkapan: {
    buku_servis: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    buku_manual: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    kunci_serep: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    ban_serep: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    dongkrak_dan_kunci: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    catatan: {
      type: String,
      required: false,
      trim: true,
      default: null
    }
  },
  test_drive: {
    rpm_stabil: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    performa_setir: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    performa_kopling: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    perpindahan_transmisi: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    performa_rem: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    setir_lurus: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    performa_suspensi: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    bunyi_getaran: {
      type: String,
      required: false,
      trim: true,
      default: null
    },
    catatan: {
      type: String,
      required: false,
      trim: true,
      default: null
    }
  },
  foto_kendaraan: {
    default: null,
    type: {
      foto: [{
        file_name: {
          type: String,
          required: true
        },
        system_name: {
          type: String,
          required: true
        },
        extension: {
          type: String,
          required: true
        },
        mime_type: {
          type: String,
          required: true
        },
        size: {
          type: Double,
          required: true
        }
      }],
      catatan: [{
        catatan: {
          type: String,
          required: false,
          default: null
        }
      }]
    }
  }
})

const CarInspection = dbBorongBoil.model('CarInspection', carInspectionSchema, 'car_inspection')

module.exports = CarInspection