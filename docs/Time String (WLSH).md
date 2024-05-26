# Documentation
- Class name: WLSH_Time_String
- Category: WLSH Nodes/text
- Output node: False
- Repo Ref: https://github.com/wallish77/wlsh_nodes

WLSH_Time_String节点旨在根据提供的时间格式生成一个时间戳字符串。它捕获当前的日期和时间，并根据指定的样式进行格式化，提供了一种以人类可读形式获取时间信息的多功能方式。

# Input types
## Required
- style
    - ‘style’参数决定了输出时间戳字符串的格式。它至关重要，因为它决定了日期和时间的表示方式，影响生成的字符串的可读性和实用性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- time_format
    - ‘time_format’参数代表了节点输出的格式化时间戳字符串。它很重要，因为它是节点操作的主要结果，以指定格式封装了当前的日期和时间。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WLSH_Time_String:
    time_format = ['%Y%m%d%H%M%S', '%Y%m%d%H%M', '%Y%m%d', '%Y-%m-%d-%H%M%S', '%Y-%m-%d-%H%M', '%Y-%m-%d']

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'style': (s.time_format,)}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('time_format',)
    FUNCTION = 'get_time'
    CATEGORY = 'WLSH Nodes/text'

    def get_time(self, style):
        now = datetime.now()
        timestamp = now.strftime(style)
        return (timestamp,)
```