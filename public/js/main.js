$(document).ready(() => {
  $('.delete-movie-btn').on('click', (e) => {
    const target = $(e.target);
    const id = target.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: `/movies/${id}`,
      success() {
        window.location.href = '/movies/list';
      },
    });
  });
});
