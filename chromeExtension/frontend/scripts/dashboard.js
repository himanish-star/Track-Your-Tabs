
window.onload = function () {
  let followersButton = document.getElementById('followers'),
    followingButton = document.getElementById('following'),
    followersList = document.getElementById('followersList'),
    followingList = document.getElementById('followingList')

  followingList.style.display = 'none'

  followersButton.onclick = function () {
    followingList.style.display = 'none'
    followersList.style.display = 'inherit'
  }

  followingButton.onclick = function () {
    followersList.style.display = 'none'
    followingList.style.display = 'inherit'
  }
}
