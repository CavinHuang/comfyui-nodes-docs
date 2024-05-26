# Documentation
- Class name: WAS_DebugThis
- Category: debug
- Output node: True
- Repo Ref: https://github.com/WASasquatch/WAS_Extras

在'WAS_DebugThis'节点中的'debug'方法作为开发者检查和理解输入数据结构和内容的基本工具。它提供清晰、简洁的输入打印输出，有助于识别任何异常或意外行为。在开发阶段，此方法对于调试目的特别有用，确保输入符合预期格式，并有助于系统的整体质量保证。

# Input types
## Required
- input
    - 在'debug'方法中，'input'参数至关重要，因为它是将要被检查和打印出来的数据。它可以是任何类型，允许对广泛的数据进行调试。该方法能够处理各种数据类型的能力对于其在调试场景中的实用性至关重要，因为它可以提供对复杂对象和数据结构的洞察。
    - Comfy dtype: wildcard
    - Python dtype: Any

# Output types
- None
    -  'debug'方法不返回任何值，其主要功能是打印输入数据及其属性（如果输入是对象）。这允许开发者检查输入，而不会改变程序的流程或输入数据的状态。
    - Comfy dtype: None
    - Python dtype: NoneType

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_DebugThis:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'input': (wildcard, {})}}
    RETURN_TYPES = ()
    OUTPUT_NODE = True
    FUNCTION = 'debug'
    CATEGORY = 'debug'

    def debug(self, input):
        print('Debug:')
        print(input)
        if isinstance(input, object) and (not isinstance(input, (str, int, float, bool, list, dict, tuple))):
            print('Objects directory listing:')
            pprint(dir(input), indent=4)
        return ()
```