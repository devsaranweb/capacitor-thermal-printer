//
//  ZPLFactory.h
//  RTPrinterSDK
//
//  Created by King on 27/02/2018.
//  Copyright © 2018 Rongta. All rights reserved.
//

#import "CmdFactory.h"
#import "ZPLCmd.h"

@interface ZPLFactory : CmdFactory
+(ZPLCmd*) Create;
@end
