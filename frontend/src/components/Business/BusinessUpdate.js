import React, {useRef, useState, useEffect} from 'react'
import { Box, Button, FormControl, Grid, TextField, Typography } from '@mui/material';

function BusinessUpdate({
    itemUpdateHandler,
    businessDetail,
    item,
    setItem
}) {

    const refForm = useRef(null);
    const [target, setTarget] = useState();

    useEffect(() => {
        setTarget(businessDetail.code);

        setItem({
        code: businessDetail.code,
        name: businessDetail.name,
        phone: businessDetail.phone
        });
        return () => {};
    }, [businessDetail]);

    const changeHandler = (e) => {
        const { value, name } = e.target;
        setItem({ ...item, [name]: value });
    };
    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(item, target);
        itemUpdateHandler(item, target);
        setItem({ code: "", name: "", phone: "" }); // update form data 초기화
    };
    // 
    return (
        <Grid item xs={4}
            sx={{
                padding: 3,
                backgroundColor: "#FFF",
                borderRadius: "8px",
                boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
            }}
        >        
        
            <span style={{
                fontSize: '18px',
                fontWeight: 800            
            }}>
                상세보기
            </span>
            <FormControl
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    marginTop: 3,
                 }}
                component='form' 
                ref={refForm} 
                onSubmit={onSubmitHandler}
            >
                <Grid container>
                    <Grid item
                        xs={4}
                        sm={4}
                        md={4}
                        sx={{
                            backgroundColor: "#F6F7F9",
                            textAlign: "center",
                            paddingTop: "8px",
                        }}
                    >
                        <Typography sx={{fontSize: '0.9rem'}}>거래처코드</Typography>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8}>
                        <TextField 
                            id="code" 
                            name="code" 
                            type="text" 
                            variant="outlined" 
                            size="small"
                            value={item.code || ""}
                            onChange={changeHandler} 
                            sx={{width: '100%'}}
                        />
                    </Grid>
                        
                    <Grid item
                        xs={4}
                        sm={4}
                        md={4}
                        sx={{
                            backgroundColor: "#F6F7F9",
                            textAlign: "center",
                            paddingTop: "8px",
                        }} 
                    >
                        <Typography sx={{ fontSize: '0.9rem'}}>거래처명</Typography>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8}>
                        <TextField 
                            id="name" 
                            name="name" 
                            type="text" 
                            variant="outlined" 
                            size="small"
                            value={item.name || ""}
                            onChange={changeHandler} 
                            sx={{ width: '100%' }}
                        />
                    </Grid>
                    
                    <Grid item
                        xs={4}
                        sm={4}
                        md={4}
                        sx={{
                            backgroundColor: "#F6F7F9",
                            textAlign: "center",
                            paddingTop: "8px",
                        }}
                    >
                        <Typography sx={{fontSize: '0.9rem'}}>전화번호</Typography>
                    </Grid>
                
                    <Grid item xs={8} sm={8} md={8}>
                        <TextField 
                            id="phone" 
                            name="phone" 
                            type="text" 
                            variant="outlined" 
                            size="small"
                            value={item.phone || ""}
                            onChange={changeHandler} 
                            sx={{ width: '100%' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Button type="submit" name='submit' variant="outlined" sx={{marginTop: 2, width:'100%'}}>수정</Button>
                    </Grid>
                </Grid>
            </FormControl>
        </Grid>
    );
}

export default BusinessUpdate