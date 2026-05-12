//
//  CPCLFactory.h
//  RTPrinterSDK
//
//  Created by King on 03/01/2018.
//  Copyright © 2018 Rongta. All rights reserved.
//

#import "CmdFactory.h"
#import "CPCLCmd.h"

@interface CPCLFactory : CmdFactory
+(CPCLCmd*) Create;
@end
