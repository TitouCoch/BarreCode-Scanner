#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Sep 30 11:53:32 2022

@author: ivan
"""

def XOR(a,b):
    if bool((a and not b)):
        return 1
    if bool((not a and b)):
        return 1
    else:
        return 0
    
def DIV(a,b):
    result = []
    for i in range(len(a)):
        result.append(XOR(a[i],b[i]))
    return result
        
        

def CRC(licence,div):
    l = len(licence)
    ld = len(div)
    current=[]
    for i in range(ld):
        current.append(licence[i]) #debut
        print(licence[i])
    if l != 10 :
        print("erreur licence de longueur differente de 10")
    else:
        for i in range(ld-1):
            licence.append(0)
        for i in range(len(current),len(licence)):
            if current[0] == 1:
                div = DIV(current,div)
            else:
                div = DIV(current,[0 for i in range(ld)])
            current.pop(0)
            current.append()
            
            
            
            
        