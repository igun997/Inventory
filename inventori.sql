-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2018 at 03:57 AM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventori`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL,
  `nama` varchar(20) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `akuntan`
--

CREATE TABLE `akuntan` (
  `id_akuntan` int(11) NOT NULL,
  `id_transaksi_barang_keluar` int(11) DEFAULT NULL,
  `id_transaksi_barang_masuk` int(11) DEFAULT NULL,
  `tipe` enum('pengeluaran','pemasukan','pengeluaranpribadi','pemasukanpribadi') NOT NULL,
  `total` double NOT NULL,
  `alasan` varchar(25) DEFAULT NULL,
  `tgl_transaksi` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Triggers `akuntan`
--
DELIMITER $$
CREATE TRIGGER `akuntan_log` AFTER DELETE ON `akuntan` FOR EACH ROW INSERT INTO akuntan_log VALUES(OLD.id_akuntan,OLD.id_transaksi_barang_keluar,OLD.id_transaksi_barang_masuk,OLD.tipe,OLD.total,OLD.alasan,OLD.tgl_transaksi)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `akuntan_log`
--

CREATE TABLE `akuntan_log` (
  `id_akuntan` int(11) NOT NULL,
  `id_transaksi_barang_keluar` int(11) DEFAULT NULL,
  `id_transaksi_barang_masuk` int(11) DEFAULT NULL,
  `tipe` enum('pengeluaran','pemasukan') NOT NULL,
  `total` double NOT NULL,
  `alasan` varchar(25) DEFAULT NULL,
  `tgl_transaksi` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `akuntan_log`
--

INSERT INTO `akuntan_log` (`id_akuntan`, `id_transaksi_barang_keluar`, `id_transaksi_barang_masuk`, `tipe`, `total`, `alasan`, `tgl_transaksi`) VALUES
(1, 1, NULL, 'pemasukan', 150000, 'Pembayaran', '2018-05-06 17:23:43'),
(2, NULL, 1, 'pengeluaran', 10000, 'Pengeluaran Stok Opname', '2018-05-10 13:45:01'),
(3, NULL, NULL, 'pemasukan', 100000, '', '2018-05-10 14:43:37'),
(4, NULL, NULL, 'pemasukan', 5000, '', '2018-05-10 18:33:20'),
(5, NULL, 2, 'pengeluaran', 5000, 'Pengeluaran Stok Opname', '2018-05-10 18:33:36'),
(6, 2, NULL, 'pemasukan', 20000, 'Pembayaran', '2018-05-14 12:03:06'),
(7, 2, NULL, 'pemasukan', 200019980000, 'Pembayaran Hutang', '2018-05-14 12:03:23'),
(8, 3, NULL, 'pemasukan', 20000, 'Pembayaran', '2018-05-14 12:05:44');

-- --------------------------------------------------------

--
-- Table structure for table `barang`
--

CREATE TABLE `barang` (
  `id_barang` int(11) NOT NULL,
  `nama_barang` varchar(25) NOT NULL,
  `stok` double NOT NULL,
  `stok_minimum` double NOT NULL,
  `harga_modal` double NOT NULL,
  `harga_jual` double NOT NULL,
  `id_kategori_barang` int(11) NOT NULL,
  `tgl_update` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `barang`
--

INSERT INTO `barang` (`id_barang`, `nama_barang`, `stok`, `stok_minimum`, `harga_modal`, `harga_jual`, `id_kategori_barang`, `tgl_update`) VALUES
(1, 'Paralon Paralon Paralon', 0, 2, 5000, 10000, 3, '2018-05-06 17:22:53'),
(2, 'Barang dua', 5, 2, 1000, 2000, 3, '2018-05-10 14:25:43'),
(3, 'Modem', -1, 2, 200000, 20000000, 5, '2018-05-14 11:59:13');

-- --------------------------------------------------------

--
-- Table structure for table `barang_keluar`
--

CREATE TABLE `barang_keluar` (
  `id_barang_keluar` int(11) NOT NULL,
  `id_transaksi_barang_keluar` int(11) NOT NULL,
  `id_barang` int(11) NOT NULL,
  `total_keluar` double NOT NULL,
  `harga_modal` double NOT NULL,
  `harga_jual` double NOT NULL,
  `tgl_keluar` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `barang_keluar`
--

INSERT INTO `barang_keluar` (`id_barang_keluar`, `id_transaksi_barang_keluar`, `id_barang`, `total_keluar`, `harga_modal`, `harga_jual`, `tgl_keluar`) VALUES
(1, 1, 1, 10, 5000, 10000, '2018-05-06 17:23:19'),
(5, 3, 1, 2, 5000, 10000, '2018-05-14 12:05:38');

--
-- Triggers `barang_keluar`
--
DELIMITER $$
CREATE TRIGGER `penambahan_stok` AFTER DELETE ON `barang_keluar` FOR EACH ROW UPDATE barang SET stok = (stok + OLD.total_keluar) WHERE id_barang = OLD.id_barang
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `pengurangan_stok` AFTER INSERT ON `barang_keluar` FOR EACH ROW UPDATE barang SET stok = (stok - NEW.total_keluar) WHERE id_barang = NEW.id_barang
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `kategori_barang`
--

CREATE TABLE `kategori_barang` (
  `id_kategori_barang` int(11) NOT NULL,
  `nama_kategori` varchar(20) NOT NULL,
  `satuan_kategori` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kategori_barang`
--

INSERT INTO `kategori_barang` (`id_kategori_barang`, `nama_kategori`, `satuan_kategori`) VALUES
(3, 'Pipa', 'Meter'),
(4, 'Cat', 'Kaleng'),
(5, 'Perkakasan', 'Buah'),
(6, 'Kunci', 'Buah'),
(7, 'Alat Listrik', 'Buah'),
(8, 'Paku', 'Buah'),
(9, 'Baut', 'Buah'),
(10, 'Lain Lain', ''),
(11, 'Perairan', ''),
(12, 'Mata Bor', 'Buah'),
(13, 'Mata Bor Besi', 'Buah');

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id_sales` int(11) NOT NULL,
  `nama_sales` varchar(25) NOT NULL,
  `nama_perusahaan` varchar(50) DEFAULT NULL,
  `alamat` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`id_sales`, `nama_sales`, `nama_perusahaan`, `alamat`) VALUES
(2, 'Indra', 'Frasindo', 'Bekasi');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi_barang_keluar`
--

CREATE TABLE `transaksi_barang_keluar` (
  `id_transaksi_barang_keluar` int(11) NOT NULL,
  `nofaktur` varchar(50) NOT NULL,
  `nama_pembeli` varchar(30) NOT NULL,
  `alamat` text NOT NULL,
  `cashbon` double NOT NULL DEFAULT '0',
  `total_bayar` double NOT NULL DEFAULT '0',
  `status_transaksi` enum('lunas','cashbon','preorder','waiting') NOT NULL DEFAULT 'waiting',
  `tgl_transaksi_keluar` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transaksi_barang_keluar`
--

INSERT INTO `transaksi_barang_keluar` (`id_transaksi_barang_keluar`, `nofaktur`, `nama_pembeli`, `alamat`, `cashbon`, `total_bayar`, `status_transaksi`, `tgl_transaksi_keluar`) VALUES
(1, '1525602188718', 'iNDRA', 'Banjae', 0, 150000, 'lunas', '2018-05-06 17:23:08'),
(3, '1526274326742', 'Test', 'anu', 0, 20000, 'lunas', '2018-05-14 12:05:26');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi_barang_keluar_cashbon`
--

CREATE TABLE `transaksi_barang_keluar_cashbon` (
  `id_transaksi_barang_keluar` int(11) NOT NULL,
  `bayar` double NOT NULL,
  `tgl_bayar` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Triggers `transaksi_barang_keluar_cashbon`
--
DELIMITER $$
CREATE TRIGGER `pembayaran_hutang` AFTER INSERT ON `transaksi_barang_keluar_cashbon` FOR EACH ROW INSERT akuntan(id_transaksi_barang_keluar,tipe,total,alasan) VALUES (NEW.id_transaksi_barang_keluar,"pemasukan",NEW.bayar,"Pembayaran Hutang")
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `transaksi_barang_keluar_preorder`
--

CREATE TABLE `transaksi_barang_keluar_preorder` (
  `id_transaksi_barang_keluar_preorder` int(11) NOT NULL,
  `id_transaksi_barang_keluar` int(11) NOT NULL,
  `id_barang` int(11) NOT NULL,
  `total_keluar` double NOT NULL,
  `harga_jual` double NOT NULL,
  `harga_modal` double NOT NULL,
  `tgl_preorder` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transaksi_barang_keluar_preorder`
--

INSERT INTO `transaksi_barang_keluar_preorder` (`id_transaksi_barang_keluar_preorder`, `id_transaksi_barang_keluar`, `id_barang`, `total_keluar`, `harga_jual`, `harga_modal`, `tgl_preorder`) VALUES
(1, 1, 1, 5, 10000, 5000, '2018-05-06 17:23:19');

--
-- Triggers `transaksi_barang_keluar_preorder`
--
DELIMITER $$
CREATE TRIGGER `preorder` AFTER INSERT ON `transaksi_barang_keluar_preorder` FOR EACH ROW UPDATE transaksi_barang_keluar SET status_transaksi="preorder" WHERE id_transaksi_barang_keluar = NEW.id_transaksi_barang_keluar
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `transaksi_barang_masuk`
--

CREATE TABLE `transaksi_barang_masuk` (
  `id_transaksi_barang_masuk` int(11) NOT NULL,
  `id_sales` int(11) NOT NULL,
  `id_barang` int(11) NOT NULL,
  `status_transaksi` enum('lunas','tunggu','hutang') NOT NULL DEFAULT 'tunggu',
  `status_penerimaan` enum('selesai','belum') NOT NULL DEFAULT 'belum',
  `hutang` double DEFAULT '0',
  `total_bayar` double NOT NULL,
  `total_masuk` double NOT NULL,
  `tgl_transaksi_masuk` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transaksi_barang_masuk`
--

INSERT INTO `transaksi_barang_masuk` (`id_transaksi_barang_masuk`, `id_sales`, `id_barang`, `status_transaksi`, `status_penerimaan`, `hutang`, `total_bayar`, `total_masuk`, `tgl_transaksi_masuk`) VALUES
(1, 2, 1, 'lunas', 'selesai', 0, 10000, 2, '2018-05-10 13:45:01'),
(2, 2, 1, 'lunas', 'selesai', 0, 5000, 1, '2018-05-10 18:33:36');

--
-- Triggers `transaksi_barang_masuk`
--
DELIMITER $$
CREATE TRIGGER `update_akuntan` AFTER INSERT ON `transaksi_barang_masuk` FOR EACH ROW INSERT akuntan(id_transaksi_barang_masuk,tipe,total,alasan) VALUES (NEW.id_transaksi_barang_masuk,"pengeluaran",NEW.total_bayar,"Pengeluaran Stok Opname")
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `transaksi_barang_masuk_hutang`
--

CREATE TABLE `transaksi_barang_masuk_hutang` (
  `id_transaksi_barang_masuk` int(11) NOT NULL,
  `bayar` double NOT NULL,
  `tgl_bayar` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Triggers `transaksi_barang_masuk_hutang`
--
DELIMITER $$
CREATE TRIGGER `update_hutang_akuntan` AFTER INSERT ON `transaksi_barang_masuk_hutang` FOR EACH ROW INSERT akuntan(id_transaksi_barang_masuk,tipe,total,alasan) VALUES (NEW.id_transaksi_barang_masuk,"pengeluaran",NEW.bayar,"Bayar Hutang Stok Opname")
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `transaksi_barang_masuk_terima`
--

CREATE TABLE `transaksi_barang_masuk_terima` (
  `id_transaksi_barang_masuk` int(11) NOT NULL,
  `total` double NOT NULL,
  `tgl_terima` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transaksi_barang_masuk_terima`
--

INSERT INTO `transaksi_barang_masuk_terima` (`id_transaksi_barang_masuk`, `total`, `tgl_terima`) VALUES
(1, 2, '2018-05-10 13:46:28'),
(2, 1, '2018-05-10 18:33:43');

--
-- Triggers `transaksi_barang_masuk_terima`
--
DELIMITER $$
CREATE TRIGGER `update_barang` AFTER INSERT ON `transaksi_barang_masuk_terima` FOR EACH ROW UPDATE barang SET stok = stok + NEW.total WHERE id_barang = (SELECT id_barang FROM transaksi_barang_masuk WHERE id_transaksi_barang_masuk = NEW.id_transaksi_barang_masuk)
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indexes for table `akuntan`
--
ALTER TABLE `akuntan`
  ADD PRIMARY KEY (`id_akuntan`),
  ADD KEY `id_transaksi_barang_keluar` (`id_transaksi_barang_keluar`),
  ADD KEY `s` (`id_transaksi_barang_masuk`);

--
-- Indexes for table `akuntan_log`
--
ALTER TABLE `akuntan_log`
  ADD PRIMARY KEY (`id_akuntan`),
  ADD KEY `id_transaksi_barang_keluar` (`id_transaksi_barang_keluar`),
  ADD KEY `s` (`id_transaksi_barang_masuk`);

--
-- Indexes for table `barang`
--
ALTER TABLE `barang`
  ADD PRIMARY KEY (`id_barang`),
  ADD KEY `ix_id_ca` (`id_kategori_barang`);

--
-- Indexes for table `barang_keluar`
--
ALTER TABLE `barang_keluar`
  ADD PRIMARY KEY (`id_barang_keluar`),
  ADD KEY `ic_k_k` (`id_barang`),
  ADD KEY `trx_fk` (`id_transaksi_barang_keluar`);

--
-- Indexes for table `kategori_barang`
--
ALTER TABLE `kategori_barang`
  ADD PRIMARY KEY (`id_kategori_barang`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id_sales`);

--
-- Indexes for table `transaksi_barang_keluar`
--
ALTER TABLE `transaksi_barang_keluar`
  ADD PRIMARY KEY (`id_transaksi_barang_keluar`),
  ADD UNIQUE KEY `nofaktur` (`nofaktur`);

--
-- Indexes for table `transaksi_barang_keluar_cashbon`
--
ALTER TABLE `transaksi_barang_keluar_cashbon`
  ADD KEY `id_transaksi_barang_keluar` (`id_transaksi_barang_keluar`);

--
-- Indexes for table `transaksi_barang_keluar_preorder`
--
ALTER TABLE `transaksi_barang_keluar_preorder`
  ADD PRIMARY KEY (`id_transaksi_barang_keluar_preorder`),
  ADD KEY `id_transaksi_barang_keluar` (`id_transaksi_barang_keluar`),
  ADD KEY `id_barang` (`id_barang`);

--
-- Indexes for table `transaksi_barang_masuk`
--
ALTER TABLE `transaksi_barang_masuk`
  ADD PRIMARY KEY (`id_transaksi_barang_masuk`),
  ADD KEY `id_sales` (`id_sales`),
  ADD KEY `id_barang_2` (`id_barang`) USING BTREE;

--
-- Indexes for table `transaksi_barang_masuk_hutang`
--
ALTER TABLE `transaksi_barang_masuk_hutang`
  ADD KEY `id_transaksi_barang_masuk` (`id_transaksi_barang_masuk`);

--
-- Indexes for table `transaksi_barang_masuk_terima`
--
ALTER TABLE `transaksi_barang_masuk_terima`
  ADD KEY `as` (`id_transaksi_barang_masuk`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `akuntan`
--
ALTER TABLE `akuntan`
  MODIFY `id_akuntan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `akuntan_log`
--
ALTER TABLE `akuntan_log`
  MODIFY `id_akuntan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `barang`
--
ALTER TABLE `barang`
  MODIFY `id_barang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `barang_keluar`
--
ALTER TABLE `barang_keluar`
  MODIFY `id_barang_keluar` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `kategori_barang`
--
ALTER TABLE `kategori_barang`
  MODIFY `id_kategori_barang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id_sales` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `transaksi_barang_keluar`
--
ALTER TABLE `transaksi_barang_keluar`
  MODIFY `id_transaksi_barang_keluar` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `transaksi_barang_keluar_preorder`
--
ALTER TABLE `transaksi_barang_keluar_preorder`
  MODIFY `id_transaksi_barang_keluar_preorder` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `transaksi_barang_masuk`
--
ALTER TABLE `transaksi_barang_masuk`
  MODIFY `id_transaksi_barang_masuk` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `akuntan`
--
ALTER TABLE `akuntan`
  ADD CONSTRAINT `akuntan_ibfk_1` FOREIGN KEY (`id_transaksi_barang_keluar`) REFERENCES `transaksi_barang_keluar` (`id_transaksi_barang_keluar`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `akuntan_ibfk_2` FOREIGN KEY (`id_transaksi_barang_masuk`) REFERENCES `transaksi_barang_masuk` (`id_transaksi_barang_masuk`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `barang`
--
ALTER TABLE `barang`
  ADD CONSTRAINT `barang_ibfk_1` FOREIGN KEY (`id_kategori_barang`) REFERENCES `kategori_barang` (`id_kategori_barang`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `barang_keluar`
--
ALTER TABLE `barang_keluar`
  ADD CONSTRAINT `barang_keluar_ibfk_1` FOREIGN KEY (`id_transaksi_barang_keluar`) REFERENCES `transaksi_barang_keluar` (`id_transaksi_barang_keluar`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `barang_keluar_ibfk_2` FOREIGN KEY (`id_barang`) REFERENCES `barang` (`id_barang`);

--
-- Constraints for table `transaksi_barang_keluar_cashbon`
--
ALTER TABLE `transaksi_barang_keluar_cashbon`
  ADD CONSTRAINT `transaksi_barang_keluar_cashbon_ibfk_1` FOREIGN KEY (`id_transaksi_barang_keluar`) REFERENCES `transaksi_barang_keluar` (`id_transaksi_barang_keluar`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transaksi_barang_keluar_preorder`
--
ALTER TABLE `transaksi_barang_keluar_preorder`
  ADD CONSTRAINT `transaksi_barang_keluar_preorder_ibfk_1` FOREIGN KEY (`id_transaksi_barang_keluar`) REFERENCES `transaksi_barang_keluar` (`id_transaksi_barang_keluar`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transaksi_barang_keluar_preorder_ibfk_2` FOREIGN KEY (`id_barang`) REFERENCES `barang` (`id_barang`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transaksi_barang_masuk`
--
ALTER TABLE `transaksi_barang_masuk`
  ADD CONSTRAINT `transaksi_barang_masuk_ibfk_1` FOREIGN KEY (`id_sales`) REFERENCES `sales` (`id_sales`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transaksi_barang_masuk_ibfk_2` FOREIGN KEY (`id_barang`) REFERENCES `barang` (`id_barang`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transaksi_barang_masuk_hutang`
--
ALTER TABLE `transaksi_barang_masuk_hutang`
  ADD CONSTRAINT `transaksi_barang_masuk_hutang_ibfk_1` FOREIGN KEY (`id_transaksi_barang_masuk`) REFERENCES `transaksi_barang_masuk` (`id_transaksi_barang_masuk`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transaksi_barang_masuk_terima`
--
ALTER TABLE `transaksi_barang_masuk_terima`
  ADD CONSTRAINT `transaksi_barang_masuk_terima_ibfk_1` FOREIGN KEY (`id_transaksi_barang_masuk`) REFERENCES `transaksi_barang_masuk` (`id_transaksi_barang_masuk`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
