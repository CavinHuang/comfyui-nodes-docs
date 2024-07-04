
# Documentation
- Class name: IG Explorer
- Category: 🐓 IG Nodes/Explorer
- Output node: False

IG Explorer节点旨在导航和分析潜在空间，有助于探索和操纵参数以生成或修改内容。

# Input types
## Required
- folder
    - 指定包含作业队列和其他相关文件的目录，作为节点操作的起点。
    - Comfy dtype: STRING
    - Python dtype: str
- precision
    - 决定探索过程中的细节或准确度水平，影响节点检查潜在空间的精细程度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- float
    - 输出通过探索确定的浮点值，表示潜在空间中的特定点或配置。
    - Comfy dtype: FLOAT
    - Python dtype: float
- string
    - 提供在探索过程中生成或识别的图像文件名，反映当前的探索状态。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IG_ExplorerNode:
    
    def __init__(self) -> None:
        self.folder = None

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "folder": ("STRING", {"forceInput": True}),
                "precision": ("FLOAT", {"default": 0.0001, "min": FLOAT_STEP, "max": 1, "step": FLOAT_STEP})
            },
        }
    
    @classmethod
    def IS_CHANGED(cls, folder: str, precision, **kwargs):
        print(f"IS CHANGED")
        # return random.randint(1, 100000000000)
        return float("NaN")

    RETURN_TYPES = ("FLOAT","STRING",)
    FUNCTION = "main"
    CATEGORY = TREE_EXPLORER

    class Job:
        def __init__(self, param1, param2, difference=None):
            self.param1 = param1
            self.param2 = param2
            self.difference = difference

    def image_filename(self, param):
        # Format the parameter to have six digits before the decimal and six digits after
        param_str = "{:02d}_{:024d}".format(int(param), int((param % 1) * 1000000000000000000000000))
        return os.path.join(self.folder, f"image_{param_str}")
    
    # def image_filename(self, param):
        # Format the parameter to a fixed length with zero-padding
        # param_str = "{:06d}".format(int(param / FLOAT_STEP))  # Assuming param is a float
        # return os.path.join(self.folder, f"image_{param_str}")
    
    def image_exists(self, param):
        full_file = self.image_filename(param) + "_00001_.png"
        print(f"Full file: {full_file}")
        return os.path.isfile(full_file)
    
    def save_queue(self, queue, filename):
        # Ensure directory exists
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        
        # Use the .txt extension or any other preferred plaintext format
        filename = os.path.splitext(filename)[0] + '.txt'

        with open(filename, 'w') as f:
            for job in queue:
                # Create a list of job attributes
                job_data = [str(job.param1), str(job.param2)]
                if job.difference is not None:
                    job_data.append(str(job.difference))
                
                # Join the attributes with a tab delimiter and write to the file
                f.write('\t'.join(job_data) + '\n')

    def load_queue(self, filename):
        # Change the file extension from .json to .txt to match the new format
        filename = os.path.splitext(filename)[0] + '.txt'
        
        try:
            with open(filename, 'r') as f:
                queue = []
                for line in f:
                    parts = line.strip().split('\t')
                    param1, param2 = float(parts[0]), float(parts[1])
                    difference = float(parts[2]) if len(parts) > 2 else None
                    queue.append(self.Job(param1, param2, difference))
                return queue
        except FileNotFoundError:
            # Initialize with one job with parameters 0 and 1
            return [self.Job(0, 1)]

    # def measure_difference(self, param1, param2):
        # return 1
    
    def measure_difference(self, param1, param2):
        # Read the images
        image1 = imread(self.image_filename(param1) + "_00001_.png")
        image2 = imread(self.image_filename(param2) + "_00001_.png")
        
        # Convert the images to grayscale
        image1_gray = cv2.cvtColor(image1, cv2.COLOR_BGR2GRAY)
        image2_gray = cv2.cvtColor(image2, cv2.COLOR_BGR2GRAY)
        
        # Compute SSIM between two images
        ssim_value = ssim(image1_gray, image2_gray)
        print(f"{param1} {param2} - {ssim_value}")
        return ssim_value

    def process_jobs(self, queue, precision):
        for job in queue:
            if job.difference is None:
                # Generate images if not already done
                if not self.image_exists(job.param1):
                    return job.param1
                if not self.image_exists(job.param2):
                    return job.param2
                # Measure and set the difference
                job.difference = self.measure_difference(job.param1, job.param2)

        # Filter jobs that have a difference greater than precision and have a measured difference
        eligible_jobs = [job for job in queue if job.difference is not None and abs(job.param1 - job.param2) > precision]

        # If no eligible jobs are found, return -1
        if not eligible_jobs:
            return -1

        # Find the job with the maximum difference
        max_diff_job = min(eligible_jobs, key=lambda job: job.difference)
        print(f"Min similarity {max_diff_job.param1} {max_diff_job.param2} {max_diff_job.difference}")
        queue.remove(max_diff_job)

        # Split range and create new jobs
        mid_param = (max_diff_job.param1 + max_diff_job.param2) / 2
        new_job1 = self.Job(max_diff_job.param1, mid_param)
        new_job2 = self.Job(mid_param, max_diff_job.param2)
        queue.extend([new_job1, new_job2])

        # Generate the new image
        return mid_param

    def main(self, folder, precision):
        self.folder = folder
        queue_path = os.path.join(folder,'job_queue.json')
        queue = self.load_queue(queue_path)
        param = self.process_jobs(queue, precision)
        self.save_queue(queue, queue_path)
        assert param > -1, "🤖 Exploration finished!"
        return (param, self.image_filename(param))

```
