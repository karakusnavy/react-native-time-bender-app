import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';

var Timer;

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nowHour: '00:00:00',
      frozenSecond: 'BAŞLAT',
      infoDisplay: false,
      makineSecModal: false,
      startTime: '',
      finishTime: 'henüz bitmedi...',
      topSecond: 'henüz bitmedi...',
      machineName: 'Makine Seçilmedi',
      saveModal: false,
      //-----------
      options:true,
      selectMachineView: false,
      addWhy:false,
      addMachineName:false,
      saves:false
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ nowHour: new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() })
    }, 1000)
  }


  selectMachine(name) {
    this.setState({
      machineName: name,
      makineSecModal: false,
      selectMachineView:false,
      options:true
    })

  }

  clickedTime(info) {
    if (info == 'start') {
      this.setState({
        frozenSecond: 1,
        topSecond: 'henüz bitmedi...',
        finishTime: 'henüz bitmedi...',
        startTime: new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
        infoDisplay: true
      })
      Timer = setInterval(() => {
        this.setState({ frozenSecond: this.state.frozenSecond + 1 })
      }, 1000);
    }
    if (info == 'stop') {
      clearInterval(Timer)
      this.setState({
        topSecond: this.state.frozenSecond,
        frozenSecond: 'BAŞLAT',
        finishTime: new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
      })
    }


  }

  render() {
    let data = [{
      value: 'Lavabo ihtiyacı',
    }, {
      value: 'Öğle yemek molası',
    }, {
      value: 'Makine arızası',
    }, {
      value: 'Su ihtiyacı',
    }];
    return (
      <View style={{ flex: 1 }} >
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.saveModal}
          onRequestClose={() => {
            this.setState({ saveButton: false })
          }}>
          <View style={{ flex: 1, backgroundColor: '#353b48', padding: 10 }} >
            <View style={{ alignItems: 'flex-end' }} >
              <Icon name={'close'} size={40} color='gray' onPress={() => this.setState({ saveModal: false })} style={{ marginLeft: 10 }} />
            </View>
            <View style={{ padding: 10, flexDirection: 'row' }}>
              <View style={{ alignItems: 'flex-start', flex: 1 }} >
                <Text style={{ color: 'lightgray', fontWeight: 'bold' }} >MAKİNE ADI</Text>
              </View>
              <View style={{ flex: 1 }} >
                <Text style={{ color: 'white', fontWeight: 'normal' }} >{this.state.machineName}</Text>
              </View>
            </View>
            <View style={{ padding: 10, flexDirection: 'row' }}>
              <View style={{ alignItems: 'flex-start', flex: 1 }} >
                <Text style={{ color: 'lightgray', fontWeight: 'bold' }} >TARİH</Text>
              </View>
              <View style={{ flex: 1 }} >
                <Text style={{ color: 'white', fontWeight: 'normal' }} >{new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()}</Text>
              </View>
            </View>
            <View style={{ padding: 10, flexDirection: 'row' }}>
              <View style={{ alignItems: 'flex-start', flex: 1 }} >
                <Text style={{ color: 'lightgray', fontWeight: 'bold' }} >BAŞLANGIÇ</Text>
              </View>
              <View style={{ flex: 1 }} >
                <Text style={{ color: 'white', fontWeight: 'normal' }}>{this.state.startTime}</Text>
              </View>
            </View>
            <View style={{ padding: 10, flexDirection: 'row' }}>
              <View style={{ alignItems: 'flex-start', flex: 1 }} >
                <Text style={{ color: 'lightgray', fontWeight: 'bold' }} >BİTİŞ</Text>
              </View>
              <View style={{ flex: 1 }} >
                <Text style={{ color: 'white', fontWeight: 'normal' }}>{this.state.finishTime}</Text>
              </View>
            </View>
            <View style={{ padding: 10, flexDirection: 'row' }}>
              <View style={{ alignItems: 'flex-start', flex: 1 }} >
                <Text style={{ color: 'lightgray', fontWeight: 'bold' }} >TOPLAM SÜRE</Text>
              </View>
              <View style={{ flex: 1 }} >
                <Text style={{ color: 'white', fontWeight: 'normal' }}>{this.state.topSecond} Saniye</Text>
              </View>
            </View>
            <View style={{ padding: 10, paddingBottom: 0 }} >
              <Text style={{ color: 'white' }} >Lütfen neden girin veya seçin</Text>
            </View>
            <View style={{ padding: 10, paddingTop: 0 }}>
              <Dropdown
                label='Tıklayıp Neden Seçimi Yapınız'
                data={data}
                baseColor='lightgray'
                textColor='white'
                selectedItemColor='black'
              />
            </View>

            <View style={{ alignItems: 'flex-end' }} >
              <TouchableOpacity style={{ backgroundColor: '#2f3640', padding: 10, borderWidth: 1, width: 120, borderRadius: 10, justifyContent: 'center', alignItems: 'center', elevation: 2, marginRight: 5, borderColor: 'white', marginTop: 10 }} >
                <Text style={{ color: 'white' }} >KAYDET</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.makineSecModal}
          onRequestClose={() => {
            this.setState({ makineSecModal: false })
          }}>
          <View style={{ flex: 1, backgroundColor: 'white', marginTop: '90%', padding: 10 }} >
            <View style={{ alignItems: 'flex-end' }} >
              <Icon name={'close'} size={25} color='gray' onPress={() => this.setState({ makineSecModal: false })} style={{ marginLeft: 10 }} />
            </View>
            <View style={{ marginTop: 5,display:this.state.options==true?'flex':'none' }} >
              <TouchableOpacity onPress={()=>this.setState({selectMachineView:true,options:false})} style={{ flexDirection: 'row', height: 50, backgroundColor: '#353b48', justifyContent: 'center', alignItems: 'center', margin: 2, borderRadius: 10 }} >
                <Icon name={'arrow-right'} size={20} color='white' style={{ marginRight: 10 }} />
                <Text style={{ color: 'white', fontWeight: 'bold' }} >Makine Seçimi Yap</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: 'row', height: 50, backgroundColor: '#353b48', justifyContent: 'center', alignItems: 'center', margin: 2, borderRadius: 10 }} >
                <Icon name={'plus'} size={20} color='white' style={{ marginRight: 10 }} />
                <Text style={{ color: 'white', fontWeight: 'bold' }} >Neden Ekle</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: 'row', height: 50, backgroundColor: '#353b48', justifyContent: 'center', alignItems: 'center', margin: 2, borderRadius: 10 }} >
                <Icon name={'plus'} size={20} color='white' style={{ marginRight: 10 }} />
                <Text style={{ color: 'white', fontWeight: 'bold' }} >Makine Ekle</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: 'row', height: 50, backgroundColor: '#353b48', justifyContent: 'center', alignItems: 'center', margin: 2, borderRadius: 10 }} >
                <Icon name={'folder'} size={20} color='white' style={{ marginRight: 10 }} />
                <Text style={{ color: 'white', fontWeight: 'bold' }} >Kayıtlar</Text>
              </TouchableOpacity>

            </View>

            <View style={{display:this.state.selectMachineView==true?'flex':'none' }} >
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.selectMachine('Makine 1')} style={{ height: 60, width: '45%', backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center', margin: 2, borderRadius: 10 }} >
                  <Text style={{ color: 'white', fontWeight: 'bold' }} >Makine 1</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.selectMachine('Makine 2')} style={{ height: 60, width: '45%', backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center', margin: 2, borderRadius: 10 }} >
                  <Text style={{ color: 'white', fontWeight: 'bold' }} >Makine 2</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.selectMachine('Makine 3')} style={{ height: 60, width: '45%', backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center', margin: 2, borderRadius: 10 }} >
                  <Text style={{ color: 'white', fontWeight: 'bold' }} >Makine 3</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.selectMachine('Makine 4')} style={{ height: 60, width: '45%', backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center', margin: 2, borderRadius: 10 }} >
                  <Text style={{ color: 'white', fontWeight: 'bold' }} >Makine 4</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.selectMachine('Makine 5')} style={{ height: 60, width: '45%', backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center', margin: 2, borderRadius: 10 }} >
                  <Text style={{ color: 'white', fontWeight: 'bold' }} >Makine 5</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.selectMachine('Makine 6')} style={{ height: 60, width: '45%', backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center', margin: 2, borderRadius: 10 }} >
                  <Text style={{ color: 'white', fontWeight: 'bold' }} >Makine 6</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </Modal>
        <ScrollView style={styles.container} >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30 }} >
            <Text style={{ color: 'white', marginBottom: 10, fontSize: 17 }}>{this.state.machineName}</Text>
            <Text style={{ color: 'lightgray', marginBottom: 10, fontSize: 17 }}>{this.state.nowHour}</Text>
            <TouchableOpacity onPress={() => this.state.frozenSecond == 'BAŞLAT' ? this.clickedTime('start') : this.clickedTime('stop')} style={styles.timeButton}>
              <Text style={styles.timeButtonText}>{this.state.frozenSecond}</Text>
              <Text style={{ color: '#e84118', display: this.state.frozenSecond == 'BAŞLAT' ? 'none' : 'flex' }}>DURDUR</Text>
            </TouchableOpacity>
            <View style={{
              backgroundColor: '#2f3640',
              padding: 10,
              marginTop: 10,
              borderRadius: 10,
              borderWidth: 1,
              display: this.state.infoDisplay == true ? 'flex' : 'none'
            }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: '#7f8fa6' }} >Başlangıç Saati: </Text>
                <Text style={{ color: '#dcdde1' }} >{this.state.startTime}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: '#7f8fa6' }} >Bitiş Saati: </Text>
                <Text style={{ color: '#dcdde1' }} >{this.state.finishTime}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: '#7f8fa6' }} >Toplam Süre: </Text>
                <Text style={{ color: '#dcdde1' }} >{this.state.topSecond}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity style={styles.saveButton} onPress={() => this.setState({ saveModal: true })} >
                  <Text style={{ color: 'white', fontWeight: 'bold' }} >KAYDET</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={{ backgroundColor: '#353b48', alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => this.setState({ makineSecModal: true })} style={{ backgroundColor: 'lightgray', width: 150, height: 40, borderTopLeftRadius: 10, borderTopRightRadius: 10, marginRight: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <Text>AYARLAR</Text>
            <Icon name={'chevron-up'} size={20} color='gray' style={{ marginLeft: 10 }} />
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  info: {

  },
  container: {
    flex: 1,
    backgroundColor: '#353b48'
  },
  timeButton: {
    height: 200,
    width: 200,
    borderRadius: 200 / 2,
    borderWidth: 1,
    borderColor: '#7f8fa6',
    justifyContent: 'center',
    alignItems: 'center'
  },
  timeButtonText: {
    color: 'white',
    fontSize: 20
  },
  saveButton: {
    padding: 5,
    backgroundColor: '#2f3640',
    width: 80,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 10
  }
});
