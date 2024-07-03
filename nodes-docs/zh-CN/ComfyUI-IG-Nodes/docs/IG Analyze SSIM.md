
# Documentation
- Class name: IG Analyze SSIM
- Category: 🐓 IG Nodes/Explorer
- Output node: False

IG Analyze SSIM节点旨在使用结构相似性指数度量（SSIM）来评估给定文件夹中连续图像之间的相似度。它计算连续图像对之间的SSIM值，可能表明视觉内容的变化或变异。此外，它还通过绘图可视化这些SSIM值，提供了图像序列中相似性趋势的图形表示。

# Input types
## Required
- folder
    - 'folder'参数指定包含要分析的图像的目录。它对于确定进行SSIM计算和比较的图像集至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional
- ymin
    - 'ymin'参数设置SSIM图的y轴最小值，允许自定义图的垂直比例以更好地可视化SSIM数据。
    - Comfy dtype: FLOAT
    - Python dtype: float
- ymax
    - 'ymax'参数设置SSIM图的y轴最大值，使得可以调整图的垂直比例以最佳地可视化SSIM趋势。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- image
    - 输出是一个图像张量，表示连续图像之间的SSIM数据图。这个图形输出提供了图像序列中结构相似性趋势的可视化摘要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IG_AnalyzeSSIM:
    
    def __init__(self) -> None:
        self.folder = None

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "folder": ("STRING", {"forceInput": True}),
            },
            "optional": {
                "ymin": ("FLOAT", {"default": 0}),
                "ymax": ("FLOAT", {"default": 1}),
            }
        }
    
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "main"
    CATEGORY = TREE_EXPLORER

    def main(self, folder, ymin, ymax):
        self.folder = folder
        ssim_file = os.path.join(folder, 'ssim_data.json')

        # Check if SSIM data already exists
        # if os.path.exists(ssim_file):
        if False:
            with open(ssim_file, 'r') as file:
                ssim_data = json.load(file)
        else:
            # Calculate SSIM and save it to JSON file
            ssim_data = self.calculate_ssim(folder)
            with open(ssim_file, 'w') as file:
                json.dump(ssim_data, file)

        # Plot the SSIM data
        image_tensor = self.plot_ssim_data(ssim_data, ymin, ymax)

        return (image_tensor, )
    
    def calculate_ssim(self, folder):
        files = [f for f in sorted(os.listdir(folder)) if os.path.splitext(f)[1].lower() in FolderOfImages.IMG_EXTENSIONS]
        ssim_values = []

        for i in range(len(files) - 1):
            file1 = os.path.join(folder, files[i])
            file2 = os.path.join(folder, files[i+1])
            print(f"File {file1} {file2}")
            img1 = imread(file1)
            img2 = imread(file2)
            # Convert the images to grayscale
            image1_gray = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
            image2_gray = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)
            ssim_val = ssim(image1_gray, image2_gray, multichannel=True)
            ssim_values.append(ssim_val)

        return ssim_values

    def plot_ssim_data(self, ssim_data, ymin, ymax):
        plt.figure(figsize=(12, 6))
        plt.plot(ssim_data)
        plt.title('SSIM Between Consecutive Images')
        plt.xlabel('Image Index')
        plt.ylabel('SSIM Value')

         # Set the range for the y-axis
        plt.ylim(ymin, ymax)

        plt.draw()
        plot_image = PIL.Image.frombytes('RGB', plt.gcf().canvas.get_width_height(), plt.gcf().canvas.tostring_rgb())
        plt.close()

        plot_image = plot_image.resize((2048, 1024))
        image_tensor = torchvision.transforms.functional.to_tensor(plot_image)
        image_tensor = einops.rearrange(image_tensor, 'c h w -> h w c').unsqueeze(0)
        
        return image_tensor

```
