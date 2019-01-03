# SoonHee Calendar

Calendar Component for React Project

[Demo](https://gmlwo530.github.io/demo-soonhee-calendar/)

## Installing

#### npm

`npm install soonhee-calendar `



#### yarn

`yarn add soonhee-calendar`



## Usage

##### Import SoonHee Calendar

```javascript
import {Calendar} from 'soonhee-calendar'
....

....
class Foo extends Components{
    render(){
        return(
            ...
            <Calendar />
            ...
        )
    }
}
```



##### Change SoonHee Calendar Type

```javascript

class Foo extends Components{
    state = {
        soonHeeCalendar: {
            type: 1
        }
    }
    render(){
        return(
            ...
            <Calendar type={this.state.soonHeeCalendar.type} />
            ...
        )
    }
}
```

##### Change SoonHee Calendar Background-Color

##### Change SoonHee Calendar Type

```javascript

class Foo extends Components{
    state = {
        soonHeeCalendar: {
            backgroundColor: '#fa7268'
        }
    }
    render(){
        return(
            ...
            <Calendar backgroundColor={this.state.soonHeeCalendar.backgroundColor} />
            ...
        )
    }
}
```




## Author

[CHOI HEE JAE](https://github.com/gmlwo530), [JANG SOON HO]( https://github.com/snowjang24)



## License

[MIT](https://github.com/gmlwo530/soonhee-calendar/blob/master/LICENSE)
